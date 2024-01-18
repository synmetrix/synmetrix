import { findSqlCredentials } from "./dataSourceHelpers.js";

import buildSecurityContext from "./buildSecurityContext.js";
import { getDataSourceAccessList } from "./defineUserScope.js";

const buildSqlSecurityContext = (sqlCredentials) => {
  if (!sqlCredentials) {
    throw new Error("Incorrect user name or password");
  }

  const dataSourceId = sqlCredentials?.datasource?.id;
  const teamId = sqlCredentials?.datasource?.team_id;
  const allMembers = sqlCredentials?.user?.members;

  const dataSourceAccessList = getDataSourceAccessList(
    allMembers,
    dataSourceId,
    teamId
  );

  const dataSourceContext = buildSecurityContext(sqlCredentials?.datasource);

  return {
    dataSource: dataSourceContext,
    ...dataSourceAccessList,
  };
};

/**
 * Asynchronous function to check the SQL authentication for a user.
 *
 * @param {null} _ - Unused parameter.
 * @param {Object} user - The user object.
 * @returns {Promise} - A promise that resolves to an object containing the password and the security context for the user.
 *
 * @throws {Error} - Throws an error if the SQL credentials for the user are not found.
 */
const checkSqlAuth = async (_, user) => {
  const sqlCredentials = await findSqlCredentials(user);

  return {
    password: sqlCredentials?.password,
    securityContext: {
      userId: sqlCredentials?.user_id,
      userScope: buildSqlSecurityContext(sqlCredentials),
    },
  };
};

export default checkSqlAuth;
