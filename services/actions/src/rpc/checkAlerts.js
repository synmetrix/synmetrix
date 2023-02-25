import { fetchData } from './fetchDataset';
import sendExplorationScreenshot from './sendExplorationScreenshot';

import apiError from '../utils/apiError';
import generateUserAccessToken from '../utils/jwt';
import { fetchGraphQL } from '../utils/graphql';
import redisClient from '../utils/redis';
import logger from '../utils/logger';

const alertsQuery = `
  query {
    alerts {
      id
      name
      trigger_config
      delivery_type
      delivery_config
      user_id
      exploration {
        id
        datasource_id
        playground_state
      }
    }
  }
`;

const checkAndTriggerAlert = async alert => {
  const {
    id,
    name,
    exploration,
    user_id: userId,
    trigger_config: triggerConfig,
    delivery_type: deliveryType,
    delivery_config: deliveryConfig,
  } = alert;
  const { playground_state: playgroundState, id: explorationId } = exploration;

  const alertKey = `lock_alert_${id}`;
  const isAlertLocked = await redisClient.get(alertKey);

  if (isAlertLocked) {
    logger.log('Requested alert is locked');
    return null;
  }

  await redisClient.set(alertKey, 'locked');

  const lowerBound = parseFloat(triggerConfig.lowerBound, 10) || null;
  const upperBound = parseFloat(triggerConfig.upperBound, 10) || null;
  const measure = playgroundState?.measures?.[0];

  const authToken = await generateUserAccessToken(userId);

  if (!authToken) {
    logger.error('Error while generating auth token');
    return null;
  }

  const { data } = (await fetchData(
    exploration,
    {
      userId,
    },
    authToken,
  ) || {});

  const isMatched = !!data.find(row => {
    let isLowerBoundMatched = false
    let isUpperBoundMatched = false;

    const value = parseFloat(row[measure], 10);

    if (lowerBound) {
      isLowerBoundMatched = value < lowerBound;
    }

    if (upperBound) {
      isUpperBoundMatched = value > upperBound;
    }
    
    return isLowerBoundMatched || isUpperBoundMatched;
  });

  if (!isMatched) {
    await redisClient.del(alertKey);
    return null;
  }

  const { error } = await sendExplorationScreenshot(null, {
    deliveryType,
    deliveryConfig,
    explorationId,
    name: `Alert ${name}`
  });

  if (error) {
    logger.error('Error while sending notification');
    return null;
  }

  const { timeoutOnFire } = triggerConfig;
  if (parseInt(timeoutOnFire, 10) > 0) {
    await redisClient.expire(alertKey, timeoutOnFire * 60 - 1);
  } else {
    await redisClient.del(alertKey);
  }

  return id;
};

export default async () => {
  let triggeredAlerts = [];

  const alertsResponse = await fetchGraphQL(alertsQuery);
  const { alerts } = alertsResponse.data;

  try {
    triggeredAlerts = await Promise.all(alerts.map(alert => checkAndTriggerAlert(alert)));
    triggeredAlerts = triggeredAlerts.filter(Boolean);
  } catch (error) {
    return apiError(error);
  }

  return { error: false, triggeredAlerts };
};
