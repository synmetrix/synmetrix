import DriverDependencies from "@cubejs-backend/server-core/dist/src/core/DriverDependencies.js";
import defineUserScope from "./defineUserScope.js";

const driverError = (err) => {
  console.error("Driver error:");

  const throwError = () => {
    throw new Error(err?.message || err);
  };

  return {
    tablesSchema: throwError,
    testConnection: throwError,
  };
};

/**
 * Asynchronous function to create a database driver with the given security context.
 *
 * @param {Object} securityContext - The security context object.
 * @param {Object|string} securityContext.dbParams - The parameters for the database connection, either as an object or as a JSON string.
 * @param {string} securityContext.dbType - The type of the database.
 * @returns {Promise} - A promise that resolves to a database driver object.
 *
 * @throws {Error} - Throws an error if the driver is invalid.
 */
const driverFactory = async ({ securityContext, dataSource }) => {
  const { userScope, user } = securityContext || {};

  let dbParams;
  let dbType;

  console.log("dataSource", dataSource);
  if (!dataSource || dataSource === "default") {
    dbParams = userScope.dataSource.dbParams;
    dbType = userScope.dataSource.dbType;
  } else {
    const nextUserScope = defineUserScope(
      user.dataSources,
      user.members,
      dataSource
    );

    console.log("nextUserScope", nextUserScope);
    dbParams = nextUserScope.dataSource.dbParams;
    dbType = nextUserScope.dataSource.dbType;
  }

  console.log("dbParams", dbParams);

  let driverModule;

  try {
    const dbDriver = DriverDependencies[dbType];
    driverModule = await import(dbDriver);

    if (dbType === "druid") {
      driverModule = driverModule.default;
    }

    if (dbType === "databricks-jdbc") {
      return new driverModule.DatabricksDriver(dbParams);
    }
  } catch (err) {
    return driverError(err);
  }

  const driverClass = new driverModule.default(dbParams);
  return driverClass;
};

export default driverFactory;
