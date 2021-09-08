export const AUTH_PREFIX = window.AUTH_PREFIX || process.env.AUTH_PREFIX;
export const GRAPHQL_SERVER_URL = window.GRAPHQL_SERVER_URL || process.env.GRAPHQL_SERVER_URL;
export const GRAPHQL_WS_URL = window.GRAPHQL_WS_URL || process.env.GRAPHQL_WS_URL;
export const GRAPHQL_PLUS_SERVER_URL = window.GRAPHQL_PLUS_SERVER_URL || process.env.GRAPHQL_PLUS_SERVER_URL;

export default () => {
  const withAuthPrefix = (path) => {
    let prefix = '';
    if (AUTH_PREFIX) {
      prefix = AUTH_PREFIX;
    }

    return `${prefix}${path}`;
  };

  return {
    withAuthPrefix,
  };
};
