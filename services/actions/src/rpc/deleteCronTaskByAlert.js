import { fetchMetadataAPI } from '../utils/hasuraMetadataApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

export default async (session, input) => {
  const id = input?.event?.data?.old?.id;

  const cronTaskParams = {
    type : 'delete_cron_trigger',
    args : {
      name: id
    }
  };

  try {
    const result = await fetchMetadataAPI(cronTaskParams);

    return { result };
  } catch (err) {
    logger.error(err);
    return apiError(err);
  }
};
