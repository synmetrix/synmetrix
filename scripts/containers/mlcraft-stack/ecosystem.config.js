// internal cubejs server url
const CUBEJS_PORT = process.env.CUBEJS_PORT || 4000;
const CUBEJS_URL = process.env.CUBEJS_URL || `http://localhost:${CUBEJS_PORT}`;
// cubejs JWT secret
const CUBEJS_SECRET = process.env.CUBEJS_SECRET || 'cubejsSecret';

// internal actions server url
const ACTIONS_PORT = process.env.ACTIONS_PORT || 3000;
const ACTIONS_URL = process.env.ACTIONS_URL || `http://localhost:${ACTIONS_PORT}`;

// internal hasura plus url
const HASURA_PLUS_PORT = process.env.HASURA_PLUS_PORT || 3030;
const HASURA_PLUS_ENDPOINT = process.env.HASURA_PLUS_ENDPOINT || `http://localhost:${HASURA_PLUS_PORT}`;
// internal hasura url
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql';

// public hasura plus url
const HASURA_PLUS_SERVER_URL = process.env.HASURA_PLUS_SERVER_URL || `http://localhost:${HASURA_PLUS_PORT}`;

// auth JWT algo
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
// auth JWT key
const JWT_KEY = process.env.JWT_KEY || 'jhyu89jiuhyg7678hoijhuytf7ghjiasodibagsdga9dha8os7df97a6sdgh9asudgo7f7g8h1uuoyafsod8pgasipdg8aps9dhaiaisydg8agsd87gasd9oihasd87gas78d';
// don't change namespace
const JWT_CLAIMS_NAMESPACE = process.env.JWT_CLAIMS_NAMESPACE || 'hasura';

module.exports = {
  apps : [
    {
      name: 'client',
      script: './run_client.sh',
      env: {
        GRAPHQL_SERVER_URL: '/v1/graphql',
        GRAPHQL_WS_URL: '/v1/graphql',
        GRAPHQL_PLUS_SERVER_URL: '',
      }
    },
    {
      name: 'hasura',
      script: './graphql-engine serve',
      env: {
        HASURA_GRAPHQL_ENABLE_CONSOLE: true,
        HASURA_GRAPHQL_ENABLE_TELEMETRY: false,
        HASURA_GRAPHQL_UNAUTHORIZED_ROLE: 'anonymous',
        HASURA_GRAPHQL_JWT_SECRET: JSON.stringify({
          type: JWT_ALGORITHM,
          key: JWT_KEY,
          claims_namespace: JWT_CLAIMS_NAMESPACE,
        }),
        ACTIONS_URL,
      }
    },
    {
      name: 'hasura_migrations',
      script: 'wait-on http-get://localhost:8080 && cd mlcraft/services/hasura && hasura migrate apply --skip-update-check --disable-interactive',
      autorestart: false,
    },
    {
      name: 'hasura_metadata',
      script: 'wait-on --delay 10000 http-get://localhost:8080 && cd mlcraft/services/hasura && hasura metadata apply --skip-update-check',
      autorestart: false,
    },
    {
      name: 'hasura_seeds',
      script: 'wait-on --delay 10000 http-get://localhost:8080 && cd mlcraft/services/hasura && hasura seeds apply --skip-update-check',
      autorestart: false,
    },
    {
      name: 'hasura_plus',
      script: 'cd hasura-backend-plus && npm install --loglevel=error && npm run build && npm start',
      env: {
        PORT: HASURA_PLUS_PORT,
        AUTO_ACTIVATE_NEW_USERS: true,
        MAGIC_LINK_ENABLED: true,
        EMAILS_ENABLED: true,
        MIN_PASSWORD_LENGTH: process.env.MIN_PASSWORD_LENGTH || 6,
        DATABASE_URL: process.env.HASURA_GRAPHQL_DATABASE_URL,
        SERVER_URL: HASURA_PLUS_SERVER_URL,
        JWT_KEY,
        JWT_ALGORITHM,
        JWT_CLAIMS_NAMESPACE,
        HASURA_ENDPOINT,
      }
    },
    {
      name: 'actions',
      script: 'cd mlcraft/services/actions && npm install --loglevel=error && npm start',
      env: {
        PORT: ACTIONS_PORT,
        CUBEJS_URL,
        CUBEJS_SECRET,
        HASURA_ENDPOINT,
        HASURA_PLUS_ENDPOINT,
      }
    },
    {
      name: 'cubejs',
      script: 'cd mlcraft/services/cubejs && npm install --loglevel=error && npm start',
      env: {
        PORT: CUBEJS_PORT,
        HASURA_ENDPOINT,
        CUBEJS_SECRET,
      }
    },
    {
      name: 'nginx',
      script: 'envsubst < /app/nginx/default.conf.template > /etc/nginx/sites-enabled/default && nginx -g "daemon off;"',
    },
    {
      name: 'wait_ready',
      script: './wait_ready.sh',
      autorestart: false,
    },

  ]
};
