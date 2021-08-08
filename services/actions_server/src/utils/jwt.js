import jwt from 'jsonwebtoken';
import dateFns from 'date-fns';

const { addMinutes } = dateFns;

export const jwtVerify = (value) => {
  const jwtDecoded = jwt.verify(value, process.env.JWT_SECRET);

  return jwtDecoded
};

const createJWT = async (payload = {}, options = {}) => {
  // ttl 10 days
  const { ttl = 14400, redisClient } = options;
  const today = new Date();
  const expirationDate = addMinutes(today.getTime(), ttl);
  const exp = parseInt(expirationDate.getTime() / 1000, 10);

  const token = jwt.sign(
    {
      ...payload,
      exp,
    },
    process.env.JWT_SECRET
  );

  if (payload.is_public && redisClient) {
    const ttl = exp - parseInt(today.getTime() / 1000, 10);
    await redisClient.set(`tokens_user_${payload.user_id}_${exp}`, token, 'EX', ttl);
  }

  return token;
};

const validateJWT = async (redisClient, payload) => {
  const { user_id: userId, exp } = payload;
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const isTokenValid = await redisClient.exists(`tokens_user_${userId}_${exp}`, token);

  return isTokenValid;
};

const revokeUserJWTs = async (redisClient, userId) => {
  const keys = await redisClient.keys(`tokens_user_${userId}_*`);
  const promises = keys.map(key => redisClient.del(key));

  const results = await Promise.all(promises);

  return results;
};

export { createJWT, validateJWT, revokeUserJWTs };
