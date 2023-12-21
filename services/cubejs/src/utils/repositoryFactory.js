import { dataSchemaFiles } from "./dataSourceHelpers.js";

/**
 * Function to create a repository object for a given security context.
 *
 * @param {Object} securityContext - The security context object.
 * @param {string} securityContext.dataSourceId - The ID of the data source.
 * @param {string} securityContext.authToken - The authentication token for the data source.
 * @param {string} securityContext.userId - The ID of the user.
 * @returns {Object} - The repository object, which includes a method to get the data schema files for the data source.
 */
const repositoryFactory = ({ securityContext }) => {
  const { dataSourceId, authToken, userId } = securityContext || {};

  return {
    dataSchemaFiles: () => dataSchemaFiles({ dataSourceId, authToken, userId }),
  };
};

export default repositoryFactory;
