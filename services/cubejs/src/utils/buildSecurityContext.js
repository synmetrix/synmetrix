import JSum from "jsum";

import createMd5Hex from "./md5Hex.js";
import mapSchemaToFile from "./mapSchemaToFile.js";

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
export const buildSecurityContext = (dataSource) => {
  if (!dataSource) {
    throw new Error("No dataSource provided");
  }

  if (!dataSource?.db_params) {
    throw new Error("No dbParams provided");
  }

  const data = {
    dataSourceId: dataSource.id,
    dbType: dataSource.db_type?.toLowerCase(),
    dbParams: dataSource.db_params,
  };

  const dataSourceVersion = JSum.digest(data, "SHA256", "hex");

  const files = (dataSource?.dataschemas || []).map((schema) =>
    mapSchemaToFile(schema)
  );
  const schemaVersion = createMd5Hex(files);

  return {
    ...data,
    dataSourceVersion,
    schemaVersion,
  };
};
