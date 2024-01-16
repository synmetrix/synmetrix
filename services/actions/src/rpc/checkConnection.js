import apiError from "../utils/apiError.js";
import cubejsApi from "../utils/cubejsApi.js";

export default async (session, input, headers) => {
  const { datasource_id: dataSourceId } = input || {};
  const userId = session?.["x-hasura-user-id"];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).test();

    return result;
  } catch (err) {
    if (err.name === "AbortError") {
      return apiError({
        code: "check_connection_timeout",
        message: "Source connection timeout. Check the credentials",
      });
    }

    return apiError(err);
  }
};
