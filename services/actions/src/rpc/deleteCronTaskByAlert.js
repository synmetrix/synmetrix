import apiError from "../utils/apiError.js";
import { fetchMetadataAPI } from "../utils/hasuraMetadataApi.js";
import logger from "../utils/logger.js";

export default async (_, input) => {
  const id = input?.event?.data?.old?.id;

  const cronTaskParams = {
    type: "delete_cron_trigger",
    args: {
      name: id,
    },
  };

  try {
    const result = await fetchMetadataAPI(cronTaskParams);

    return { result };
  } catch (err) {
    logger.error(err);
    return apiError(err);
  }
};
