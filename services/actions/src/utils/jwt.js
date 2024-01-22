import { SignJWT } from "jose";

import logger from "../utils/logger.js";

const { JWT_EXPIRES_IN, JWT_ALGORITHM, JWT_CLAIMS_NAMESPACE, JWT_KEY } =
  process.env;

const generateUserAccessToken = async (userId) => {
  const hasuraCompatibleJwtPayload = {
    [JWT_CLAIMS_NAMESPACE]: {
      ["x-hasura-user-id"]: userId,
      ["x-hasura-allowed-roles"]: ["user"],
      ["x-hasura-default-role"]: "user",
    },
  };

  try {
    const secret = new TextEncoder().encode(JWT_KEY);
    const accessToken = await new SignJWT(hasuraCompatibleJwtPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setIssuer("services:actions")
      .setAudience("services:hasura")
      .setExpirationTime(`${JWT_EXPIRES_IN}m`)
      .setSubject(userId)
      .sign(secret);

    return accessToken;
  } catch (error) {
    logger.error(error);

    return null;
  }
};

export default generateUserAccessToken;
