import { fetchData } from './fetchDataset';
import sendExplorationScreenshot from './sendExplorationScreenshot';

import apiError from '../utils/apiError';
import generateUserAccessToken from '../utils/jwt';
import { fetchGraphQL } from '../utils/graphql';
import { getLockKey, getLockData, setLockData, delLockData } from '../utils/alertLocks';

const alertQuery = `
  query ($id: uuid!) {
    alerts_by_pk(id: $id) {
      id
      name
      trigger_config
      delivery_type
      delivery_config
      locks_config
      exploration {
        id
        datasource_id
        user_id
        playground_state
      }
    }
  }
`;

const checkAndTriggerAlert = async (alert) => {
  const result = {
    fired: false,
    locked: false,
    lockKey: null,
    lockValue: null,
    lockTTL: 0,
  };

  const {
    id,
    name,
    exploration,
    trigger_config: triggerConfig,
    delivery_type: deliveryType,
    delivery_config: deliveryConfig,
  } = alert;

  if (!exploration) {
    return apiError('Exploration not found');
  }

  const { playground_state: playgroundState, user_id: userId } = exploration;

  const { value: lockValue, ttl } = await getLockData(alert);

  if (lockValue) {
    result.locked = true;
    result.lockKey = getLockKey(id);
    result.lockValue = lockValue;
    result.lockTTL = ttl;

    return result;
  }

  const requestTimeout = (parseInt(triggerConfig?.requestTimeout, 10) || 1) * 60;
  const timeoutOnFire = (parseInt(triggerConfig?.timeoutOnFire, 10) || 0) * 60;

  const lowerBound = parseFloat(triggerConfig.lowerBound, 10) || null;
  const upperBound = parseFloat(triggerConfig.upperBound, 10) || null;
  const measure = playgroundState?.measures?.[0];

  const authToken = await generateUserAccessToken(userId);

  if (!authToken) {
    throw new Error('Error while generating auth token');
  }

  await setLockData(alert, { value: 'on request', ttl: requestTimeout })

  let dataset = [];

  try {
    const { data } = (await fetchData(
      exploration,
      {
        userId,
      },
      authToken,
    ) || {});

    dataset = data;
  } catch (error) {
    await delLockData(alert);
    throw new Error(error);
  }

  const isMatched = !!dataset.find(row => {
    let isLowerBoundMatched = false;
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
    await delLockData(alert);
    return result;
  }

  const { error } = await sendExplorationScreenshot({
    deliveryType,
    deliveryConfig,
    exploration,
    name: `Alert ${name}`
  });

  await delLockData(alert);

  if (error) {
    throw new Error(error);
  }

  if (timeoutOnFire > 0) {
    result.locked = true;
    result.lockKey = getLockKey(id);
    result.lockValue = 'on fire';
    result.lockTTL = timeoutOnFire;

    await setLockData(alert, { value: 'on fire', ttl: timeoutOnFire })
  }

  result.fired = true;

  return result;
};

export default async (session, input) => {
  const { id } = input?.payload || {};

  const queryResult = await fetchGraphQL(alertQuery, { id });
  const alert = queryResult?.data?.alerts_by_pk || {};

  let result;

  try {
    result = await checkAndTriggerAlert(alert);
  } catch (error) {
    return apiError(error);
  }

  return { error: false, result };
};
