import moment from "moment-timezone";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";

import apiError from "../utils/apiError.js";
import generateUserAccessToken from "../utils/jwt.js";
import logger from "../utils/logger.js";
import { putFileToBucket } from "../utils/s3.js";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SENDER,
  APP_FRONTEND_URL,
  AWS_S3_BUCKET_NAME,
} = process.env;

const EXPLORATION_DATA_SELECTOR = "#explorationTable";
const PUPPETEER_WAITING_TIMEOUT = 30000;
const TIMEZONE = "UTC";

const mailerOptions = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE === "true",
};

if (SMTP_USER && SMTP_PASS) {
  mailerOptions.auth = {
    user: SMTP_USER,
    pass: SMTP_PASS,
  };
}

const mailer = nodemailer.createTransport(mailerOptions);

const sendToWebhook = async ({ webhookUrl, body, headers = {} }) => {
  try {
    const result = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });

    return result;
  } catch (err) {
    return apiError(err);
  }
};

const getCleanSelectorSize = (selector) => {
  const header = document.querySelector(".ant-layout-header");
  const footer = document.querySelector(".ant-layout-footer");
  const sider = document.querySelector(".ant-layout-sider");
  const alert = document.querySelector(".ant-alert");

  [header, footer, sider, alert].forEach((element) =>
    element?.parentNode?.removeChild(element)
  );

  const selectorWidth = document.querySelector(selector).scrollWidth;
  const selectorHeight = document.querySelector(selector).scrollHeight;

  return { width: selectorWidth, height: selectorHeight };
};

const fetchDatasetResponseHandler = async (response) => {
  // skip if can't parse json
  try {
    const jsonResponse = await response.json();
    const { data = [], progress } = jsonResponse?.data?.fetch_dataset || {};

    if (progress?.loading || data.length === 0) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
};

const getDataAndScreenshot = async (exploration) => {
  const {
    datasource_id: datasourceId,
    user_id: userId,
    id: explorationId,
  } = exploration;

  const explorationTableURL = `${APP_FRONTEND_URL}/explore/${datasourceId}/${explorationId}/?screenshot=1`;

  const accessToken = await generateUserAccessToken(userId);

  if (!accessToken) {
    console.error("Access token hasn`t been signed");
    return { error: "Access token hasn`t been signed" };
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      pipe: true,
      headless: true,
      dumpio: true,
      args: [
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--no-zygote",
        "--disable-gpu",
        "--disable-audio-output",
        "--headless",
        "--single-process",
      ],
    });
  } catch (error) {
    logger.error(`browser start error: ${error}`);

    return { error };
  }

  const page = await browser.newPage();

  page.on("console", (msg) => {
    logger.log(`browser console log: ${msg.text()}`);
  });

  await page.goto(APP_FRONTEND_URL);

  // set up credentials for domain before loading protected page

  await page.evaluate((token) => {
    localStorage.clear();
    localStorage.setItem("access-token", token);
  }, accessToken);

  // intercept rows fetching

  let resultJsonData = null;

  try {
    const [, datasetResponse] = await Promise.all([
      page.goto(explorationTableURL, { waitUntil: "domcontentloaded" }),
      page.waitForResponse(fetchDatasetResponseHandler, {
        timeout: PUPPETEER_WAITING_TIMEOUT,
      }),
      page.waitForSelector(EXPLORATION_DATA_SELECTOR, {
        timeout: PUPPETEER_WAITING_TIMEOUT,
      }),
    ]);

    const datasetJsonResponse = await datasetResponse.json();
    resultJsonData = datasetJsonResponse.data.fetch_dataset.data;
  } catch (error) {
    logger.error(`page data error: ${error}`);
    await browser.close();

    return { error };
  }

  // wait for table resizes and side effects
  await new Promise((r) => setTimeout(r, 1000));

  const { width, height } = await page.evaluate(
    getCleanSelectorSize,
    EXPLORATION_DATA_SELECTOR
  );
  await page.setViewport({ width, height });

  const resultImageBinary = await page.screenshot({
    encoding: "binary",
    fullPage: true,
  });

  await browser.close();

  return { data: resultJsonData, screenshot: resultImageBinary };
};

const sendToSlack = async ({ header, jsonUrl, screenshotUrl, webhookUrl }) => {
  const defaultBlocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${header}* \n\n<${jsonUrl}|Download JSON>`,
      },
    },
  ];

  const screenshotBlock = {
    type: "image",
    image_url: screenshotUrl,
    alt_text: header,
  };

  const body = {
    username: "Notifications",
    blocks: [...defaultBlocks, screenshotBlock],
  };

  let deliveryResult = await sendToWebhook({ webhookUrl, body });

  if (deliveryResult?.status === 400) {
    body.blocks = defaultBlocks;
    deliveryResult = await sendToWebhook({ webhookUrl, body });
  }

  return deliveryResult;
};

const sendToEmail = async ({ header, jsonUrl, screenshotUrl, address }) => {
  const result = await mailer.sendMail({
    from: SMTP_SENDER,
    to: address,
    subject: header,
    html: `<img src=${screenshotUrl} /><br /><br /><a href=${jsonUrl}>Download JSON</a>`,
  });

  return result;
};

export default async ({ deliveryType, exploration, deliveryConfig, name }) => {
  const { id: explorationId } = exploration;
  const { data, screenshot, error } = await getDataAndScreenshot(exploration);

  if (error) {
    return apiError(error);
  }

  const dateMoment = moment().tz(TIMEZONE).format("DD-MM-YYYY HH:mm");
  const filePathPrefix = `${explorationId}/${dateMoment}`;

  const { error: uploadDataError, url: jsonUrl } = await putFileToBucket({
    bucketName: AWS_S3_BUCKET_NAME,
    fileBody: JSON.stringify(data),
    filePath: `${filePathPrefix}/data.json`,
    fileContentType: "text/json",
  });

  const { error: uploadScreenshotError, url: screenshotUrl } =
    await putFileToBucket({
      bucketName: AWS_S3_BUCKET_NAME,
      fileBody: screenshot,
      filePath: `${filePathPrefix}/screenshot.png`,
      fileContentType: "image/png",
      fileContentLength: Buffer.byteLength(screenshot),
    });

  const s3Error = uploadDataError || uploadScreenshotError;

  if (s3Error) {
    return apiError(s3Error);
  }

  let deliveryResult;
  const { url: webhookUrl, address } = deliveryConfig;
  const header = `${name} at ${dateMoment}`;

  switch (deliveryType) {
    case "WEBHOOK":
      deliveryResult = await sendToWebhook({
        webhookUrl,
        body: { jsonUrl, screenshotUrl },
      });
      break;
    case "SLACK":
      deliveryResult = await sendToSlack({
        header,
        jsonUrl,
        screenshotUrl,
        webhookUrl,
      });
      break;
    case "EMAIL":
      deliveryResult = await sendToEmail({
        header,
        jsonUrl,
        screenshotUrl,
        address,
      });

      break;
    default:
      return apiError("Unsupported delivery type");
  }

  return { error: false, deliveryResult };
};
