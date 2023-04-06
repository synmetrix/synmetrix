export const AUTH_PREFIX = window.AUTH_PREFIX || process.env.AUTH_PREFIX;
export const GRAPHQL_SERVER_URL = window.GRAPHQL_SERVER_URL || process.env.GRAPHQL_SERVER_URL;
export const GRAPHQL_PLUS_SERVER_URL = window.GRAPHQL_PLUS_SERVER_URL || process.env.GRAPHQL_PLUS_SERVER_URL;
export const CUBEJS_MYSQL_API_URL = window.CUBEJS_MYSQL_API_URL || process.env.CUBEJS_MYSQL_API_URL;
export const CUBEJS_PG_API_URL = window.CUBEJS_PG_API_URL || process.env.CUBEJS_PG_API_URL;

const getWsUrl = (path) => {
  // if url contains ws:// already
  if (/ws/.test(path)) {
    return path;
  }

  // if only the path
  const protocolPrefix = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';
  return `${protocolPrefix}//${window.location.host}${path}`;
};

export const GRAPHQL_WS_URL = getWsUrl(window.GRAPHQL_WS_URL || process.env.GRAPHQL_WS_URL);

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
