import moment from "moment-timezone";

import { fetchGraphQL } from "../utils/graphql.js";
import redisClient from "../utils/redis.js";

const TIMEZONE = "UTC";

const alertSetLockMutation = `
  mutation ($id: uuid!, $locks_config: jsonb) {
    update_alerts_by_pk(
      pk_columns: { id: $id }
      _set: { locks_config: $locks_config }
    ) {
      id
    }
  }
`;

export const getLockKey = (id) => {
  return `alert:${id}:lock`;
};

export const getLockData = async (alert) => {
  const result = { key: null, value: null, ttl: null };

  const { id, locks_config: locksConfig } = alert;
  const { value, expiresAt } = locksConfig;

  const lockKey = getLockKey(id);
  const lockValue = await redisClient?.get(lockKey);

  if (lockValue) {
    const ttl = await redisClient.ttl(lockKey);

    result.key = lockKey;
    result.value = lockValue;
    result.ttl = ttl;

    return result;
  }

  const isExpired = moment().tz(TIMEZONE).isAfter(expiresAt);

  if (isExpired) {
    return result;
  }

  const ttl = moment().tz(TIMEZONE).diff(expiresAt, "seconds");

  result.key = lockKey;
  result.value = value;
  result.ttl = Math.abs(ttl);

  return result;
};

export const setLockData = async (alert, { value, ttl }) => {
  const { id } = alert;
  const lockKey = getLockKey(id);

  if (redisClient) {
    await redisClient.set(lockKey, value, "EX", ttl);

    return;
  }

  const expiresAt = moment().tz(TIMEZONE).add(ttl, "seconds").format();

  await fetchGraphQL(alertSetLockMutation, {
    id,
    locks_config: { value, expiresAt },
  });

  return;
};

export const delLockData = async (alert) => {
  const { id } = alert;
  const lockKey = getLockKey(id);

  if (redisClient) {
    await redisClient.del(lockKey);

    return;
  }

  await fetchGraphQL(alertSetLockMutation, { id, locks_config: {} });
};
