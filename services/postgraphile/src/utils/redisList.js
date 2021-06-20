import logger from './logger';

export const toRedisList = async (redisClient, key, value, ttl = 60 * 60 * 2) => {
  let result;

  try {
    result = await redisClient.rpush(key, JSON.stringify(value));
  } catch (err) {
    logger.error(`Redis RPUSH for ${key} error: `, err);
  }

  await redisClient.expire(key, ttl);

  return result;
};

export const getList = async (redisClient, key) => {
  let currentValue;

  try {
    currentValue = await redisClient.lrange(key, 0, -1);
  } catch (err) {
    console.error(err);
    logger.error(`Redis LRANGE for ${key} error: `, err);
  }

  if (!currentValue) {
    return [];
  } else {
    return currentValue;
  }
};

export const getListKey = (key, type) => {
  return `${type}_${key}`;
};
