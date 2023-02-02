import { SignJWT } from 'jose';

import logger from '../utils/logger';

const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN;
const JWT_ALGORITHM=process.env.JWT_ALGORITHM;
const JWT_CLAIMS_NAMESPACE=process.env.JWT_CLAIMS_NAMESPACE;
const JWT_KEY=process.env.JWT_KEY;

const generateUserAccessToken = async (userId) => {
  const hasuraCompatibleJwtPayload = {
    [JWT_CLAIMS_NAMESPACE]: {
      ['x-hasura-user-id']: userId,
      ['x-hasura-allowed-roles']: ['user'],
      ['x-hasura-default-role']: 'user',
    }
  };

  try {
    const secret = new TextEncoder().encode(JWT_KEY);
    const accessToken = await new SignJWT(hasuraCompatibleJwtPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setIssuer('mlcraft:actions')
      .setAudience('mlcraft:hasura')
      .setExpirationTime(`${JWT_EXPIRES_IN}m`)
      .setSubject(userId)
      .sign(secret)

    return accessToken;
  } catch (error) {
    logger.error(error);

    return null;
  }
};

export default generateUserAccessToken;
