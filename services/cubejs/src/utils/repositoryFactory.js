/**
 * Generates documentation for the repository factory.
 * @param {Object} options - The options for the repository factory.
 * @param {Object} options.securityContext - The security context.
 * @returns {Object} - The repository factory object.
 */
const repositoryFactory = ({ securityContext }) => {
  return {
    /**
     * Retrieves the data schema files.
     * @returns {Array} - The data schema files.
     */
    dataSchemaFiles: () => securityContext?.userScope?.dataSource?.files || [],
  };
};

export default repositoryFactory;
