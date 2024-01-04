import { getDataSources } from "./dataSourceHelpers.js";
import buildSecurityContext from "./buildSecurityContext.js";

/**
 * Asynchronous function to get the security contexts for all data sources to refresh cache.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of objects, where each object contains the security context for a data source.
 */
const scheduledRefreshContexts = async () => {
  const dataSources = await getDataSources();

  return (dataSources || []).map((dataSource) => {
    const userScopeDataSource = buildSecurityContext(dataSource);

    return {
      securityContext: {
        userScope: {
          dataSource: userScopeDataSource,
        },
      },
    };
  });
};

export default scheduledRefreshContexts;
