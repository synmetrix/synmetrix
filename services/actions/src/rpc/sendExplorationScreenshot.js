import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import moment from 'moment-timezone';

import apiError from '../utils/apiError';
import logger from '../utils/logger';
import { fetchGraphQL } from '../utils/graphql';
import { putFileToBucket } from '../utils/s3';
import generateUserAccessToken from '../utils/jwt';

const APP_FRONTEND_URL = 'https://08a3-176-33-97-236.eu.ngrok.io';
const HASURA_ENDPOINT = 'https://3494-176-33-97-236.eu.ngrok.io/v1/graphql';
// const APP_FRONTEND_URL = process.env.APP_FRONTEND_URL;
// const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;

const EXPLORATION_DATA_SELECTOR = '#explorationTable';
const PUPPETEER_WAITING_TIMEOUT = 60000;
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

  await page.goto(explorationTableURL, {
    waitUntil: 'networkidle2',
  });

  // intercept rows fetching

  let resultData = null;

  try {
    await page.waitForResponse(async response => {
      if (response.url() !== HASURA_ENDPOINT) {
        return false;
      }
  
      const jsonResponse = await response.json();
      const fetchedData = jsonResponse?.data?.fetch_dataset?.data;
  
      if (!fetchedData) {
        return false;
      }

      resultData = fetchedData;
      return true;
    }, { timeout: PUPPETEER_WAITING_TIMEOUT });
  } catch (error) {
    logger.error(`waiting data error: ${error}`);
    return { error };
  }

  // wait for the table and remove all useless components from viewport

  try {
    await page.waitForSelector(EXPLORATION_DATA_SELECTOR, { timeout: PUPPETEER_WAITING_TIMEOUT });
  } catch (error) {
    logger.error(`waiting selector ${EXPLORATION_DATA_SELECTOR} error: ${error}`);
    return { error };
  }

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

  const imageBase64 = await page.screenshot({
    encoding: 'binary',
    fullPage: true,
  });

  browser.close();

  return { data: resultData, screenshot: imageBase64 };
}

export default async (session, input) => {
  const { deliveryType, explorationId, deliveryConfig } = input || {};

  const queryResult = await fetchGraphQL(explorationQuery, { id: explorationId });
  const exploration = queryResult?.data?.explorations_by_pk || {};

  const { data, screenshot, error } = await getDataAndScreenshot(exploration);

  if (error) {
    return apiError(error);
  }

  const dateMoment = moment().tz(TIMEZONE).format('DD-MM-YYYY HH:mm');
  const filePathPrefix = `${explorationId}/${dateMoment}`;

  const { error: uploadDataError, url: dataUrl } = await putFileToBucket({
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

  logger.log(`got data: ${dataUrl}`);
  logger.log(`got screenshot: ${screenshotUrl}`);

  // TODO switch by deliveryType and load exploration
  // try {
  //   const result = await fetch(
  //     webhook,
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({}),
  //       headers,
  //     }
  //   );
  // } catch (err) {
  //   return apiError(err);
  // }

  // return result;

  return null;
};
