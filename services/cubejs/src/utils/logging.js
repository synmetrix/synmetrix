import { devLogger } from '@cubejs-backend/server-core/dist/src/core/logger.js';
import redisClient from './redis.js';
import fs from 'fs';

export const logging = async (message, event) => {
  const requestId = event?.requestId;

  const log = devLogger('info')(message, event);

  if (log) {
    console.log(log);
  }

  if (!requestId || requestId?.includes('scheduler')) {
    return;
  }

  const data = event;
  data.event = message;

  if (data.path) {
    data.path = data.path?.split('?')?.[0];
  }

  data.timestamp = new Date().toISOString();

  if (data?.securityContext) {
    data.userId = data.securityContext.userId;
    data.dataSourceId = data.securityContext.dataSourceId;

    delete data.securityContext;
  }

  await redisClient.xadd(
    'streams:cubejs-logs-stream',
    '*',
    'data',
    JSON.stringify(data)
  );
};
