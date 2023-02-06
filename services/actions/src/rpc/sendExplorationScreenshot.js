import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import moment from 'moment-timezone';
import nodemailer from 'nodemailer';

import apiError from '../utils/apiError';
import logger from '../utils/logger';
import { fetchGraphQL } from '../utils/graphql';
import { putFileToBucket } from '../utils/s3';
import generateUserAccessToken from '../utils/jwt';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SENDER,
  APP_FRONTEND_URL
} = process.env;

const EXPLORATION_DATA_SELECTOR = '#explorationTable';
const PUPPETEER_WAITING_TIMEOUT = 30000;
const TIMEZONE = 'UTC';
const BUCKET_NAME = 'explorations';

const explorationQuery = `
  query ($id: uuid!) {
    explorations_by_pk(id: $id) {
      id
      datasource_id
      user_id
    }
  }
`;

const sendToWebhook = async ({ url, body, headers = {} }) => {
  try {
    const result = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      }
    );

    return result;
  } catch (err) {
    return apiError(err);
  }
}

const getDataAndScreenshot = async (exploration) => {
  const { datasource_id: datasourceId, user_id: userId, id: explorationId } = exploration;

  const explorationTableURL = `${APP_FRONTEND_URL}/~/explore/${datasourceId}/${explorationId}/?screenshot=1`;

  const accessToken = await generateUserAccessToken(userId);

  if (!accessToken) {
    return { error: 'Access token hasn`t been signed' };
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    executablePath: '/usr/bin/google-chrome-stable',
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
  });
  const page = await browser.newPage();

  page.on('console', msg => {
    logger.log(`browser console log: ${msg.text()}`);
  });

  await page.goto(APP_FRONTEND_URL);

  // set up credentials for domain before loading protected page

  await page.evaluate((token) => {
    localStorage.clear();
    localStorage.setItem('access-token', token);
  }, accessToken);

  // intercept rows fetching

  let resultJsonData = null;

  try {
    await Promise.all([
      await page.goto(explorationTableURL, {
        waitUntil: 'domcontentloaded',
      }),
      await page.waitForResponse(async response => {
        // skip if can't parse json
        try {
          const jsonResponse = await response.json();
          const { data = [], progress } = jsonResponse?.data?.fetch_dataset || {};

          if (progress?.loading || data.length === 0) {
            return false;
          }

          resultJsonData = data;
        } catch (error) {
          return false;
        }

        return true;
      }, { timeout: PUPPETEER_WAITING_TIMEOUT }),
      await page.waitForSelector(EXPLORATION_DATA_SELECTOR, { timeout: PUPPETEER_WAITING_TIMEOUT }),
    ]);
  } catch (error) {
    logger.error(`page data error: ${error}`);
    await browser.close();

    return { error };
  }

  // wait for table resizes and side effects
  await new Promise(r => setTimeout(r, 1000));

  const width = await page.evaluate((selector) => document.querySelector(selector).scrollWidth, EXPLORATION_DATA_SELECTOR);
  const height = await page.evaluate((selector) => document.querySelector(selector).scrollHeight, EXPLORATION_DATA_SELECTOR);
  await page.setViewport({ width, height });

  await page.evaluate(() => {
    const header = document.querySelector('.ant-layout-header');
    const footer = document.querySelector('.ant-layout-footer');
    const sider = document.querySelector('.ant-layout-sider');
    const alert = document.querySelector('.ant-alert');

    [header, footer, sider, alert].forEach(element => element?.parentNode?.removeChild(element));
  });

  const resultImageBinary = await page.screenshot({
    encoding: 'binary',
    fullPage: true,
  });

  await browser.close();

  return { data: resultJsonData, screenshot: resultImageBinary };
}

export default async (session, input) => {
  const { deliveryType, explorationId, deliveryConfig, reportName } = input || {};

  const queryResult = await fetchGraphQL(explorationQuery, { id: explorationId });
  const exploration = queryResult?.data?.explorations_by_pk || {};

  const { data, screenshot, error } = await getDataAndScreenshot(exploration);

  if (error) {
    return apiError(error);
  }

  const dateMoment = moment().tz(TIMEZONE).format('DD-MM-YYYY HH:mm');
  const filePathPrefix = `${explorationId}/${dateMoment}`;

  const { error: uploadDataError, url: jsonUrl } = await putFileToBucket({
    bucketName: BUCKET_NAME,
    fileBody: JSON.stringify(data),
    filePath: `${filePathPrefix}/data.json`,
    fileContentType: 'text/json'
  });

  const { error: uploadScreenshotError, url: screenshotUrl } = await putFileToBucket({
    bucketName: BUCKET_NAME,
    fileBody: screenshot,
    filePath: `${filePathPrefix}/screenshot.png`,
    fileContentType: 'image/png',
    fileContentLength: Buffer.byteLength(screenshot)
  });

  const s3Error = uploadDataError || uploadScreenshotError;

  if (s3Error) {
    return apiError(s3Error);
  }

  let deliveryResult;
  const { url: webhookUrl, address: emailAddress } = deliveryConfig;

  switch (deliveryType) {
    case 'WEBHOOK':
      deliveryResult = await sendToWebhook({ url: webhookUrl, body: { jsonUrl, screenshotUrl } });
      break;
    case 'SLACK':
      const body = {
        username: 'MLCraft Scheduled Reports',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Report ${reportName} at ${dateMoment}* \n\n<${jsonUrl}|Download JSON>`
            },
          },
          {
            type: 'image',
            image_url: screenshotUrl,
            alt_text: reportName,
          }
        ],
      };

      deliveryResult = await sendToWebhook({ url: webhookUrl, body });
      break;
    case 'EMAIL':
      const mailerOptions = {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE ?? false,
      };

      if (SMTP_USER && SMTP_PASS) {
        mailerOptions.auth = {
          user: SMTP_USER,
          pass: SMTP_PASS,
        };
      }

      const mailer = nodemailer.createTransport(mailerOptions);
      await mailer.sendMail({
        from: SMTP_SENDER,
        to: emailAddress,
        subject: `Report ${reportName} at ${dateMoment}`,
        html: `<img src=${screenshotUrl} /><br /><br /><a href=${jsonUrl}>Download JSON</a>`,
      });

      break;
    default:
      return apiError('Unsupported delivery type');
  };

  return { error: false, deliveryResult };
};
