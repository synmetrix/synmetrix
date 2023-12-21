import {
  buildSecurityContext,
  findSqlCredentials,
} from "./dataSourceHelpers.js";

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

  if (!sqlCredentials) {
    throw new Error("Incorrect user name or password");
  }

  const securityContext = buildSecurityContext(sqlCredentials.datasource);

  return {
    password: sqlCredentials.password,
    securityContext: {
      ...securityContext,
      userId: sqlCredentials.user_id,
    },
  };
};

export default checkSqlAuth;
