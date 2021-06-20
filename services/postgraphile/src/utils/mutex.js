const DEFAULT_TTL = 60 * 2;
export const touchMutex = async (redisClient, key, value, opts = {}) => {
  const currentValue = await redisClient.get(key);

  if (!currentValue) {
    const { ttl } = opts;
    await redisClient.set(key, value, 'EX', ttl || DEFAULT_TTL);
    return null;
  } else {
    return value;
  }
};

export const checkMutex = async (redisClient, key, opts = {}) => {
  if (key) {
    const mutex = await touchMutex(redisClient, key, true, opts);

    if (mutex) {
      throw new Error(`Locked with mutexKey: ${key}`);
    }
  }

  return null;
};

export const removeMutex = async (redisClient, key) => {
  await redisClient.del(key);
};

export const getMutexKey = (id, entity) => {
  return `mutex_${entity}_${id}`;
};

export const touchMutexSet = async (redisClient, key, value, opts = {}) => {
  const { ttl, maxCalls } = opts;
  const mutexExists = await redisClient.scard(key);

  await redisClient.sadd(key, value);

  if (!mutexExists) {
    redisClient.expire(key, ttl);
  }

  const currentSet = await redisClient.smembers(key);
  if (currentSet.length >= maxCalls) {
    await redisClient.del(key);
  }

  return currentSet;
};
