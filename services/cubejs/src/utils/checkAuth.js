import jwt from "jsonwebtoken";

import { findDataSource, getPermissions } from "./dataSourceHelpers.js";
import buildSecurityContext from "./buildSecurityContext.js";

const { JWT_KEY, JWT_ALGORITHM } = process.env;

/**
 * Checks the authorization of the request and sets the security context.
 *
 * @param {Object} req - The request object.
 * @throws {Error} If the Hasura Authorization token is not provided.
 * @throws {Error} If no x-hasura-datasource-id is provided in the headers.
 * @throws {Error} If there are no permissions for the specified data source.
 * @throws {Error} If there is no default branch for the specified data source.
 * @throws {Error} If the specified data source is not found.
 * @returns {Promise<void>} A promise that resolves when the security context is set.
 */
const checkAuth = async (req) => {
  // Extract the authorization header from the request
  const authHeader = req.headers.authorization;
  // Extract the data source ID from the request headers
  const dataSourceId = req.headers["x-hasura-datasource-id"];
  // Extract the branch ID from the request headers
  const branchId = req.headers["x-hasura-branch-id"];

  let jwtDecoded;
  let authToken;

  if (authHeader.startsWith("Bearer ")) {
    authToken = authHeader.split(" ")[1];
  } else {
    authToken = authHeader;
  }

  if (!authToken) {
    throw new Error("Provide Hasura Authorization token");
  }

  try {
    jwtDecoded = jwt.verify(authToken, JWT_KEY, {
      algorithms: [JWT_ALGORITHM],
    });
  } catch (err) {
    throw err;
  }

  const { "x-hasura-user-id": userId } = jwtDecoded?.hasura || {};

  if (!dataSourceId) {
    throw new Error(
      "400: No x-hasura-datasource-id provided, headers: " +
        JSON.stringify(req.headers)
    );
  }

  const permissions = await getPermissions({ dataSourceId, userId, authToken });

  if (!permissions?.dataSourceId) {
    throw new Error(`403: No permissions for source "${dataSourceId}"`);
  }

  if (!permissions?.defaultBranchId) {
    throw new Error(`403: No default branch for source "${dataSourceId}"`);
  }

  const dataSource = await findDataSource({
    dataSourceId: permissions?.dataSourceId,
    branchId: branchId || permissions?.defaultBranchId,
  });

  if (!dataSource?.id) {
    throw new Error(`404: Source "${dataSourceId}" not found`);
  }

  const securityContext = buildSecurityContext(dataSource);

  req.securityContext = {
    dataSourceId,
    userId,
    authToken,
    branchId,
    ...permissions,
    ...securityContext,
  };
};

const checkAuthMiddleware = async (req, _, next) => {
  try {
    await checkAuth(req);
    next();
  } catch (err) {
    next(err);
  }
};

export { checkAuth };
export default checkAuthMiddleware;
