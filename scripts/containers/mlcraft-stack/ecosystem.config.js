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

// hasura metadata url
const HASURA_METADATA_ENDPOINT = process.env.HASURA_METADATA_ENDPOINT || 'http://localhost:8080/v1/metadata';

// public hasura plus url
const HASURA_PLUS_SERVER_URL = process.env.HASURA_PLUS_SERVER_URL || `http://localhost:${HASURA_PLUS_PORT}`;

// app frontend URL (for exploration screenshots)
const APP_FRONTEND_URL = process.env.APP_FRONTEND_URL || 'http://localhost:8888';

// AWS S3
const { AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY } = process.env;
const AWS_S3_ENDPOINT= process.env.AWS_S3_ENDPOINT;
const AWS_S3_REGION = process.env.AWS_S3_REGION || 'us-east-1';

// auth JWT algo
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
// auth JWT key
const JWT_KEY = process.env.JWT_KEY || 'jhyu89jiuhyg7678hoijhuytf7ghjiasodibagsdga9dha8os7df97a6sdgh9asudgo7f7g8h1uuoyafsod8pgasipdg8aps9dhaiaisydg8agsd87gasd9oihasd87gas78d';
// don't change namespace
const JWT_CLAIMS_NAMESPACE = process.env.JWT_CLAIMS_NAMESPACE || 'hasura';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 10800;

module.exports = {
  apps : [
    {
      name: 'client',
      script: './run_client.sh',
      out_file: null,
      env: {
        GRAPHQL_SERVER_URL: '/v1/graphql',
        GRAPHQL_WS_URL: '/v1/graphql',
        GRAPHQL_PLUS_SERVER_URL: '',
      }
    },
    {
      name: 'hasura',
      script: './graphql-engine serve',
      max_restarts: 100,
      restart_delay: 5000,
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
      script: 'wait-on http-get://localhost:8080 && cd mlcraft/services/hasura && hasura migrate apply --skip-update-check --disable-interactive --all-databases',
      autorestart: false,
    },
    {
      name: 'hasura_metadata',
      script: 'wait-on --delay 10000 http-get://localhost:8080 && cd mlcraft/services/hasura && hasura metadata apply --skip-update-check',
      autorestart: false,
    },
    {
      name: 'hasura_seeds',
      script: 'wait-on --delay 10000 http-get://localhost:8080 && cd mlcraft/services/hasura && hasura seeds apply --skip-update-check --all-databases',
      autorestart: false,
    },
    {
      name: 'hasura_plus',
      script: 'wait-on http-get://localhost:8080 && cd hasura-backend-plus && npm install --loglevel=error && npm run --loglevel=error build && npm start',
      out_file: null,
      env: {
        PORT: HASURA_PLUS_PORT,
        AUTO_ACTIVATE_NEW_USERS: true,
        MAGIC_LINK_ENABLED: true,
        EMAILS_ENABLED: true,
        MIN_PASSWORD_LENGTH: process.env.MIN_PASSWORD_LENGTH || 6,
        DATABASE_URL: process.env.HASURA_GRAPHQL_DATABASE_URL,
        SERVER_URL: HASURA_PLUS_SERVER_URL,
        JWT_EXPIRES_IN,
        JWT_KEY,
        JWT_ALGORITHM,
        JWT_CLAIMS_NAMESPACE,
        HASURA_ENDPOINT,
      }
    },
    {
      name: 'actions',
      script: 'cd mlcraft/services/actions && npm install --loglevel=error && npm start',
      out_file: null,
      env: {
        NODE_ENV: 'production',
        LOGGER_ENV: 'production',
        PORT: ACTIONS_PORT,
        CUBEJS_URL,
        CUBEJS_SECRET,
        HASURA_ENDPOINT,
        HASURA_PLUS_ENDPOINT,
        HASURA_METADATA_ENDPOINT,
        APP_FRONTEND_URL,
        AWS_S3_ACCESS_KEY_ID,
        AWS_S3_SECRET_ACCESS_KEY,
        AWS_S3_ENDPOINT,
        AWS_S3_REGION,
        JWT_EXPIRES_IN,
        JWT_ALGORITHM,
        JWT_CLAIMS_NAMESPACE,
        JWT_KEY
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
      out_file: null,
      script: 'envsubst < /app/nginx/default.conf.template > /etc/nginx/sites-enabled/default && nginx -g "daemon off;"',
    },
    {
      name: 'wait_ready',
      script: './wait_ready.sh',
      autorestart: false,
    },

  ]
};
