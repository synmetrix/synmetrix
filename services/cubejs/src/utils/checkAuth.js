import jwt from "jsonwebtoken";

import {
  findDataSource,
  buildSecurityContext,
  getPermissions,
} from "./dataSourceHelpers.js";

const pushError = (req, error) => {
  req.securityContext = { error };
  return null;
};

const { CUBEJS_SECRET } = process.env;

/**
 * Asynchronous function to check the authentication of a request.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.authorization - The Cube.js authorization token.
 * @param {string} req.headers["x-hasura-authorization"] - The Hasura authorization token.
 * @returns {Promise} - A promise that resolves to the security context for the request.
 *
 * @throws {Error} - Throws an error if the JWT verification fails or if no dataSourceId is provided.
 */
const checkAuth = async (req) => {
  const {
    authorization: cubejsAuthToken,
    "x-hasura-authorization": authToken,
  } = req.headers;

  let jwtDecoded;
  let error;

  try {
    jwtDecoded = jwt.verify(cubejsAuthToken, CUBEJS_SECRET);
  } catch (err) {
    throw err;
  }

  const { dataSourceId, userId } = jwtDecoded || {};

  if (!dataSourceId) {
    error = "Provide dataSourceId";

    return pushError(req, error);
  }

  const dataSource = await findDataSource({ dataSourceId, authToken });
  const permissions = await getPermissions(userId);

  if (!dataSource?.id) {
    error = `Source "${dataSourceId}" not found`;

    return pushError(req, error);
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

export default checkAuth;
