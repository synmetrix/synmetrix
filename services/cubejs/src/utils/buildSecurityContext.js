import JSum from "jsum";

import createMd5Hex from "./md5Hex.js";
import prepareDbParams from "./prepareDbParams.js";

/**
 * Function to build the security context for a given data source.
 *
 * @param {Object} dataSource - The data source object.
 * @param {string} dataSource.id - The ID of the data source.
 * @param {string} dataSource.db_type - The type of the database.
 * @param {Object} dataSource.db_params - The parameters for the database connection.
 * @param {Array} dataSource.dataschemas - The data schemas for the data source.
 * @returns {Object} - The security context for the data source.
 *
 * @throws {Error} - Throws an error if no data source or no dbParams are provided.
 */
const buildSecurityContext = (user_id, dataSource, branch, version) => {
  if (!dataSource) {
    throw new Error("No dataSource provided");
  }

  let credentials = null;

  if (dataSource?.auth === "shared") {
    credentials = dataSource?.credentials?.[0];
  } else if (dataSource?.auth === "private") {
    credentials = dataSource?.credentials.find(
      (credential) => credential.user_id === user_id
    );
  }

  if (!credentials) {
    throw new Error("No dbParams provided");
  }

  const data = {
    dataSourceId: dataSource.id,
    dbType: dataSource.db_type?.toLowerCase(),
    dbParams: {
      ...dataSource.db_params,
      username: credentials.username,
      password: credentials.password,
    },
  };

  data.dbParams = prepareDbParams(data.dbParams, data.dbType);

  const dataSourceVersion = JSum.digest(data, "SHA256", "hex");

  const dataModels =
    version?.dataschemas ||
    branch?.versions?.[0]?.dataschemas ||
    dataSource.branches?.[0]?.versions?.[0]?.dataschemas ||
    [];

  const files = dataModels.map((schema) => schema.id);

  const schemaVersion = createMd5Hex(files);
  const preAggregationSchema = createMd5Hex(data.dataSourceId);

  return {
    ...data,
    dataSourceVersion,
    preAggregationSchema,
    schemaVersion,
    files,
  };
};

export default buildSecurityContext;
