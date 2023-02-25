import { fetchData } from './fetchDataset';
import sendExplorationScreenshot from './sendExplorationScreenshot';

import apiError from '../utils/apiError';
import generateUserAccessToken from '../utils/jwt';
import { fetchGraphQL } from '../utils/graphql';

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

  const lowerBound = parseFloat(triggerConfig.lowerBound, 10) || null;
  const upperBound = parseFloat(triggerConfig.upperBound, 10) || null;
  const measure = playgroundState?.measures?.[0];

  const authToken = await generateUserAccessToken(userId);

  if (!authToken) {
    return apiError('Error while generating user token');
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

  if (isMatched) {
    const { error } = await sendExplorationScreenshot(null, {
      deliveryType,
      deliveryConfig,
      explorationId,
      name: `Alert ${name}`
    });

    if (error) {
      return apiError('Error while sending notification');
    }
  }

  return id;
};

export default async (session, input) => {
  const alertsResponse = await fetchGraphQL(alertsQuery);

  const { alerts } = alertsResponse.data;

  const triggeredAlerts = await Promise.all(alerts.map(alert => checkAndTriggerAlert(alert)));

  return { error: false, triggeredAlerts };
};
