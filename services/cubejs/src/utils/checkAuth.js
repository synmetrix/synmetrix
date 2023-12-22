import jwt from "jsonwebtoken";

import {
  buildSecurityContext,
  findDataSource,
  getPermissions,
} from "./dataSourceHelpers.js";

const { CUBEJS_SECRET } = process.env;

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

  let jwtDecoded;
  let cubejsAuthToken;

  if (authHeader.startsWith("Bearer ")) {
    cubejsAuthToken = authHeader.split(" ")[1];
  } else {
    cubejsAuthToken = authHeader;
  }

  if (!cubejsAuthToken) {
    throw new Error("Provide Cube authorization token");
  }

  try {
    jwtDecoded = jwt.verify(cubejsAuthToken, CUBEJS_SECRET);
  } catch (err) {
    throw err;
  }

  const { dataSourceId, userId, authToken } = jwtDecoded || {};

  if (!authToken) {
    throw new Error("Provide Hasura authorization token");
  }

  if (!dataSourceId) {
    throw new Error("Provide dataSourceId");
  }

  const dataSource = await findDataSource({ dataSourceId, authToken });
  const permissions = await getPermissions(userId);

  if (!dataSource?.id) {
    throw new Error(`Source "${dataSourceId}" not found`);
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
