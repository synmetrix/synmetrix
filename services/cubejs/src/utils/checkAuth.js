import jwt from "jsonwebtoken";

import {
  buildSecurityContext,
  findDataSource,
  getPermissions,
} from "./dataSourceHelpers.js";

const { JWT_KEY, JWT_ALGORITHM } = process.env;

/**
 * Asynchronous function to check the authentication of a request.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.authorization - The Cube server Bearer authorization token.
 * @returns {Promise} - A promise that resolves to the security context for the request.
 *
 * @throws {Error} - Throws an error if the JWT verification fails or if no dataSourceId is provided.
 */
const checkAuth = async (req) => {
  const authHeader = req.headers.authorization;
  const dataSourceId = req.headers["x-hasura-datasource-id"];

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

  const dataSource = await findDataSource({
    dataSourceId: permissions?.dataSourceId,
  });

  if (!dataSource?.id) {
    throw new Error(`404: Source "${dataSourceId}" not found`);
  }

  const securityContext = buildSecurityContext(dataSource);

  req.securityContext = {
    dataSourceId,
    userId,
    authToken,
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
