const getColumnsArray = (cube) => [
  ...(cube?.dimensions || []),
  ...(cube?.measures || []),
  ...(cube?.segments || []),
];

/**
 * Asynchronous function to rewrite a query based on the user's permissions.
 *
 * @param {Object} query - The query object.
 * @param {Object} context - The context object.
 * @param {Object} context.securityContext - The security context object.
 * @param {string} context.securityContext.dataSourceId - The ID of the data source.
 * @param {string} context.securityContext.userId - The ID of the user.
 * @param {Object} context.securityContext.config - The configuration object for the data source.
 * @param {string} context.securityContext.config.role - The role of the user.
 * @param {Object} context.securityContext.config.datasources - The datasources object for the data source.
 * @returns {Promise<Object>} - A promise that resolves to the rewritten query object.
 *
 * @throws {Error} - Throws an error if the user does not have access to the data source or to a specific cube.
 */
const queryRewrite = async (query, { securityContext }) => {
  const { userScope } = securityContext;
  const { dataSourceAccessList, role } = userScope;

  if (["owner", "admin"].includes(role)) {
    return query;
  }

  if (!dataSourceAccessList) {
    throw new Error("403: You have no access to the datasource");
  }

  const queryNames = getColumnsArray(query);
  const accessNames = Object.values(dataSourceAccessList).reduce(
    (acc, cube) => [...acc, ...getColumnsArray(cube)],
    []
  );

  queryNames.forEach((cn) => {
    if (!accessNames.includes(cn)) {
      throw new Error(`403: You have no access to "${cn}" cube property`);
    }
  });

  return query;
};

export default queryRewrite;
