import mapSchemaToFile from "./mapSchemaToFile.js";
import { findDataSchemasByIds } from "./dataSourceHelpers.js";

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
    dataSchemaFiles: async () => {
      const ids = securityContext?.userScope?.dataSource?.files;
      const dataSchemas = await findDataSchemasByIds({ ids });

      return dataSchemas.map(mapSchemaToFile);
    },
  };
};

export default repositoryFactory;
