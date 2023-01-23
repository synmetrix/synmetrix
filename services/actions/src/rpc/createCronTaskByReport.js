import { fetchMetadataAPI } from '../utils/hasuraMetadataApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

const ACTIONS_PORT = process.env.ACTIONS_PORT || 3000;
const ACTIONS_URL = process.env.ACTIONS_URL || `http://localhost:${ACTIONS_PORT}`;

export default async (session, input) => {
  const reportID = input?.id;
  const reportPayload = input?.event?.data?.new;
  const operationName = input?.event?.op;

  if (operationName === "UPDATE") {
    // do recreate the trigger cause schedule has been changed
  }

  const {
    delivery_type: deliveryType,
    delivery_config: deliveryConfig,
    schedule,
    exploration_id
  } = reportPayload || {};

  const cronTaskParams = {
    type : "create_cron_trigger",
    args : {
      name: reportID,
      webhook: `${ACTIONS_URL}/rpc/deliver_message`,
      schedule,
      payload: {
        ...deliveryConfig,
        delivery_type: deliveryType,
        exploration_id
      },
      include_in_metadata: false,
      comment: `Cron event for scheduled report id: ${reportID}`
    }
  }

  try {
    const result = await fetchMetadataAPI(cronTaskParams);

    return { result };
  } catch (err) {
    logger.error(err);
    return apiError(err);
  }
};
