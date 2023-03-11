import { fetchMetadataAPI } from '../utils/hasuraMetadataApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';
import redisClient from '../utils/redis';

import deleteCronTaskByReport from './deleteCronTaskByAlert';

const getCronTaskParamsForAlert = (payload) => {
  const {
    trigger_config: triggerConfig,
    delivery_type: deliveryType,
    delivery_config: deliveryConfig,
    schedule,
    exploration_id: explorationId,
    name,
    id
  } = payload || {};

  const timeout = (parseInt(triggerConfig?.requestTimeout, 10) || 1) * 60;

  return {
    type: 'create_cron_trigger',
    args: {
      name: id,
      webhook: `{{ACTIONS_URL}}/rpc/check_alert`,
      schedule,
      payload: {
        triggerConfig,
        deliveryConfig,
        deliveryType,
        explorationId,
        name: `Alert ${name}`,
        id
      },
      retry_conf: {
        num_retries: 0,
        retry_interval_seconds: 0,
        timeout_seconds: timeout,
      },
      include_in_metadata: false,
      comment: `Cron event for alert id: ${id}`
    }
  }
};

const getCronTaskParamsForReport = (payload) => {
  const {
    delivery_type: deliveryType,
    delivery_config: deliveryConfig,
    schedule,
    exploration_id: explorationId,
    name,
    id
  } = payload || {};

  return {
    type: 'create_cron_trigger',
    args: {
      name: id,
      webhook: `{{ACTIONS_URL}}/rpc/send_exploration_screenshot`,
      schedule,
      payload: {
        deliveryConfig,
        deliveryType,
        explorationId,
        name: `Report ${name}`
      },
      retry_conf: {
        num_retries: 5,
        retry_interval_seconds: 10,
        timeout_seconds: 60,
      },
      include_in_metadata: false,
      comment: `Cron event for scheduled report id: ${id}`
    }
  }
};

export default async (session, input) => {
  const payload = input?.event?.data?.new;
  const operationName = input?.event?.op;
  const tableName = input?.table?.name;
  const { id } = payload;
  let cronTaskParams;
  let isNeedToClearLocks = false;


  switch (tableName) {
    case 'reports':
      cronTaskParams = getCronTaskParamsForReport(payload);
      break;
    case 'alerts':
      cronTaskParams = getCronTaskParamsForAlert(payload);
      isNeedToClearLocks = true;
      break;
    default:
      return apiError('Unsupported table name to create cron task');
  }

  try {
    // recreate the cron task if fields or exploration has been changed
    if (operationName === 'UPDATE') {
      const deletionParams = {
        event: {
          data: {
            old: {
              id
            }
          }
        }
      };

      if (isNeedToClearLocks) {
        const lockKey = `alert:${id}:lock`;
        await redisClient.del(lockKey);
      }

      await deleteCronTaskByReport(session, deletionParams);
    }

    const result = await fetchMetadataAPI(cronTaskParams);

    return { result };
  } catch (err) {
    logger.error(err);
    return apiError(err);
  }
};
