import { fetchData } from "./fetchDataset.js";
import sendExplorationScreenshot from "./sendExplorationScreenshot.js";

import {
  delLockData,
  getLockData,
  getLockKey,
  setLockData,
} from "../utils/alertLocks.js";
import apiError from "../utils/apiError.js";
import { fetchGraphQL } from "../utils/graphql.js";
import generateUserAccessToken from "../utils/jwt.js";

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

const checkBoundsMatch = ({ dataset, measure, lowerBound, upperBound }) =>
  !!dataset.find((row) => {
    const parsedLowerBound = parseFloat(lowerBound, 10) || null;
    const parsedUpperBound = parseFloat(upperBound, 10) || null;

    let isLowerBoundMatched = false;
    let isUpperBoundMatched = false;

    const value = parseFloat(row[measure], 10);

    if (parsedLowerBound) {
      isLowerBoundMatched = value > parsedLowerBound;
    }

    if (parsedUpperBound) {
      isUpperBoundMatched = value < parsedUpperBound;
    }

    if (parsedLowerBound && parsedUpperBound) {
      return isLowerBoundMatched && isUpperBoundMatched;
    } else if (parsedLowerBound) {
      return isLowerBoundMatched;
    } else if (parsedUpperBound) {
      return isUpperBoundMatched;
    }

    return false;
  });

const checkMultipleMeasuresBounds = ({
  dataset,
  triggerConfig,
  defaultMeasure,
}) => {
  if (Object.keys(triggerConfig?.measures || {}).length > 0) {
    // measures keys contains ":" instead of "." in the DB for preventing JSON object nesting
    const measures = Object.entries(triggerConfig.measures).map(([k, v]) => ({
      key: k.replace(":", "."),
      config: v,
    }));

    return measures.some(({ key, config }) =>
      checkBoundsMatch({
        dataset,
        measure: key,
        lowerBound: config.lowerBound,
        upperBound: config.upperBound,
      })
    );
  }

  return checkBoundsMatch({
    dataset,
    measure: defaultMeasure,
    lowerBound: triggerConfig.lowerBound,
    upperBound: triggerConfig.upperBound,
  });
};

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
    return apiError("Exploration not found");
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

  const requestTimeout =
    (parseInt(triggerConfig?.requestTimeout, 10) || 1) * 60;
  const timeoutOnFire = (parseInt(triggerConfig?.timeoutOnFire, 10) || 0) * 60;

  const authToken = await generateUserAccessToken(userId);

  if (!authToken) {
    throw new Error("Error while generating auth token");
  }

  await setLockData(alert, { value: "on request", ttl: requestTimeout });

  let dataset = [];

  try {
    const { data } =
      (await fetchData(
        exploration,
        {
          userId,
        },
        authToken
      )) || {};

    dataset = data;
  } catch (error) {
    await delLockData(alert);
    throw new Error(error);
  }

  const defaultMeasure = playgroundState?.measures?.[0]; // compatibility with 1st version of alerts
  const isMatched = checkMultipleMeasuresBounds({
    dataset,
    triggerConfig,
    defaultMeasure,
  });

  if (!isMatched) {
    await delLockData(alert);
    return result;
  }

  const { error } = await sendExplorationScreenshot({
    deliveryType,
    deliveryConfig,
    exploration,
    name: `Alert ${name}`,
  });

  await delLockData(alert);

  if (error) {
    throw new Error(error);
  }

  if (timeoutOnFire > 0) {
    result.locked = true;
    result.lockKey = getLockKey(id);
    result.lockValue = "on fire";
    result.lockTTL = timeoutOnFire;

    await setLockData(alert, { value: "on fire", ttl: timeoutOnFire });
  }

  result.fired = true;

  return result;
};

export default async (_, input) => {
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
