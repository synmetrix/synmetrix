import { fetchMetadataAPI } from '../utils/hasuraMetadataApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

export default async (session, input) => {
  const reportID = input?.id;

  const cronTaskParams = {
    type : "delete_cron_trigger",
    args : {
      name: reportID
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
