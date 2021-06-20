import url from 'url';
import unchanged from 'unchanged';
import got from 'got';
import logger from './logger';

const { get } = unchanged;
const { URL, URLSearchParams } = url;

const getErrMessage = err => get('response.body', err) || get('body', err) || get('message', err);

const postJson = async (url, body, options = {}, method = 'post', retries = 1) => {
  try {
    const { body: resBody } = await got[method](url, {
      json: true,
      body,
      responseType: 'json',
      retry: retries,
      timeout: {
        connect: 10,
        secureConnect: 15,
      },
      ...options,
    });

    return resBody;
  } catch(err) {
    if (err.code && err.code === 'ECONNRESET') {
      logger.error(`URL ${url} drops the connection. Retries: ${retries}`);
    } else {
      logger.error(err);
    }

    return Promise.reject(getErrMessage(err));
  }
};

const getPromise = (url, params, options = {}) => {
  const pageUrl = new URL(url);
  const searchParams = new URLSearchParams(params);

	pageUrl.search = searchParams;

  return got.get(pageUrl, options);
};

const getJsonPromise = (url, params, options = {}) => getPromise(url, params, {
  json: true,
  responseType: 'json',
  ...options,
});

const getJson = async (url, params = {}, options = {}) => {
  try {
    const { body: resBody } = await getJsonPromise(url, params, options);

    return resBody;
  } catch(err) {
    logger.error(err);

    return Promise.reject(getErrMessage(err));
  }
};

export { postJson, getPromise, getJsonPromise, getJson };
