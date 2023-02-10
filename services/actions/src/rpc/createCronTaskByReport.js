import { fetchMetadataAPI } from '../utils/hasuraMetadataApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

import deleteCronTaskByReport from './deleteCronTaskByReport';

export default async (session, input) => {
  const reportPayload = input?.data?.new;
  const operationName = input?.op;

  const {
    delivery_type: deliveryType,
    delivery_config: deliveryConfig,
    schedule,
    exploration_id: explorationId,
    name: reportName,
    id: reportId
  } = reportPayload || {};

  const cronTaskParams = {
    type : "create_cron_trigger",
    args : {
      name: reportId,
      webhook: `{{ACTIONS_URL}}/rpc/send_exploration_screenshot`,
      schedule,
      payload: {
        deliveryConfig,
        deliveryType,
        explorationId,
        reportName
      },
      retry_conf: {
        num_retries: 5,
        retry_interval_seconds: 10,
        timeout: 60,
      },
      include_in_metadata: false,
      comment: `Cron event for scheduled report id: ${reportId}`
    }
  }

  try {
    // recreate the cron task if fields or exploration has been changed
    if (operationName === "UPDATE") {
      const deletionParams = {
        data: {
          old: {
            id: reportId
          }
        }
      };

      await deleteCronTaskByReport(session, deletionParams);
    }

    const result = await fetchMetadataAPI(cronTaskParams);

    return { result };
  } catch (err) {
    logger.error(err);
    return apiError(err);
  }
};
