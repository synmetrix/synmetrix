// workdir
const WORK_DIR = process.env.WORK_DIR || "/app";
const STACK_DIR = process.env.STACK_DIR || `${WORK_DIR}/stack`;
const SERVICES_DIR = process.env.SERVICES_DIR || `${STACK_DIR}/services`;

// internal cubejs server url
const CUBEJS_PORT = process.env.CUBEJS_PORT || 4000;
const CUBEJS_URL = process.env.CUBEJS_URL || `http://localhost:${CUBEJS_PORT}`;
const CUBEJS_REST_API_URL =
  process.env.CUBEJS_REST_API_URL || `http://localhost/api/v1/load`;

const CUBEJS_SCHEDULED_REFRESH =
  process.env.CUBEJS_SCHEDULED_REFRESH !== undefined
    ? process.env.CUBEJS_SCHEDULED_REFRESH
    : true;

const CUBEJS_REFRESH_TIMER = process.env.CUBEJS_REFRESH_TIMER || 60;

const CUBEJS_SQL_API =
  process.env.CUBEJS_SQL_API !== undefined ? process.env.CUBEJS_SQL_API : true;

const CUBEJS_API_DOCS_URL =
  process.env.CUBEJS_API_DOCS_URL || `http://localhost:4000/docs`;

// cubejs JWT secret
const CUBEJS_SECRET = process.env.CUBEJS_SECRET || "cubejsSecret";
// cubejs db settings
const CUBEJS_DB_CLICKHOUSE_READONLY =
  process.env.CUBEJS_DB_CLICKHOUSE_READONLY !== undefined
    ? process.env.CUBEJS_DB_CLICKHOUSE_READONLY
    : true;

// cubestore
const CUBEJS_CUBESTORE_PORT = process.env.CUBEJS_CUBESTORE_PORT || 3030;
const CUBEJS_CUBESTORE_HOST = process.env.CUBEJS_CUBESTORE_HOST || "cubestore";
// cubejs sql api
const CUBEJS_SQL_PORT = process.env.CUBEJS_SQL_PORT || 13306;
const CUBEJS_PG_SQL_PORT = process.env.CUBEJS_PG_SQL_PORT || 15432;

const CUBEJS_MYSQL_API_URL =
  process.CUBEJS_MYSQL_API_URL || `localhost:${CUBEJS_SQL_PORT}`;
const CUBEJS_PG_API_URL =
  process.CUBEJS_PG_API_URL || `localhost:${CUBEJS_PG_SQL_PORT}`;

// internal actions server url
const ACTIONS_PORT = process.env.ACTIONS_PORT || 3000;
const ACTIONS_URL =
  process.env.ACTIONS_URL || `http://localhost:${ACTIONS_PORT}`;

// internal hasura plus url
const HASURA_PLUS_PORT = process.env.HASURA_PLUS_PORT || 8081;
const HASURA_PLUS_ENDPOINT =
  process.env.HASURA_PLUS_ENDPOINT || `http://localhost:${HASURA_PLUS_PORT}`;
// internal hasura url
const HASURA_ENDPOINT =
  process.env.HASURA_ENDPOINT || "http://localhost:8888/v1/graphql";

// hasura metadata url
const HASURA_METADATA_ENDPOINT =
  process.env.HASURA_METADATA_ENDPOINT || "http://localhost:8888/v1/metadata";

// public hasura plus url
const HASURA_PLUS_SERVER_URL =
  process.env.HASURA_PLUS_SERVER_URL || `http://localhost:${HASURA_PLUS_PORT}`;

// app frontend URL (for exploration screenshots)
const APP_FRONTEND_URL =
  process.env.APP_FRONTEND_URL || "http://localhost:8888";

// AWS S3
const defaultBucketNameSuffix = (size) =>
  Array(size)
    .fill()
    .map((n) => ((Math.random() * 36) | 0).toString(36))
    .join("");

const { AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY } = process.env;
const AWS_S3_ENDPOINT = process.env.AWS_S3_ENDPOINT;
const AWS_S3_REGION = process.env.AWS_S3_REGION || "us-east-1";
const AWS_S3_BUCKET_NAME =
  process.env.AWS_S3_BUCKET_NAME ||
  `data-explorations-${defaultBucketNameSuffix(12)}`;

// auth JWT algo
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || "HS256";
// auth JWT key
const JWT_KEY =
  process.env.JWT_KEY ||
  "jhyu89jiuhyg7678hoijhuytf7ghjiasodibagsdga9dha8os7df97a6sdgh9asudgo7f7g8h1uuoyafsod8pgasipdg8aps9dhaiaisydg8agsd87gasd9oihasd87gas78d";
// don't change namespace
const JWT_CLAIMS_NAMESPACE = process.env.JWT_CLAIMS_NAMESPACE || "hasura";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 10800;

// Redis
const REDIS_ADDR = process.env.REDIS_ADDR || "redis://redis:6379";

process.env.FORCE_COLOR = 1;

module.exports = {
  apps: [
    {
      name: "client",
      script: `cd ${SERVICES_DIR}/client-v2 && npx serve -s -l 5000`,
      out_file: null,
    },
    {
      name: "hasura",
      script: "/usr/local/bin/graphql-engine serve",
      max_restarts: 100,
      restart_delay: 5000,
      env: {
        HASURA_GRAPHQL_ENABLE_CONSOLE: true,
        HASURA_GRAPHQL_ENABLE_TELEMETRY: false,
        HASURA_GRAPHQL_UNAUTHORIZED_ROLE: "anonymous",
        HASURA_GRAPHQL_JWT_SECRET: JSON.stringify({
          type: JWT_ALGORITHM,
          key: JWT_KEY,
          claims_namespace: JWT_CLAIMS_NAMESPACE,
        }),
        ACTIONS_URL,
      },
    },
    {
      name: "hasura_migrations",
      script: `npx wait-on http-get://localhost:8080 && cd ${SERVICES_DIR}/hasura && hasura migrate apply --skip-update-check --disable-interactive --all-databases`,
      autorestart: false,
    },
    {
      name: "hasura_metadata",
      script: `npx wait-on --delay 10000 http-get://localhost:8080 && cd ${SERVICES_DIR}/hasura && hasura metadata apply --skip-update-check`,
      autorestart: false,
    },
    {
      name: "hasura_seeds",
      script: `npx wait-on --delay 10000 http-get://localhost:8080 && cd ${SERVICES_DIR}/hasura && hasura seeds apply --skip-update-check --all-databases`,
      autorestart: false,
    },
    {
      name: "hasura_plus",
      script: `npx wait-on http-get://localhost:8080 && cd ${SERVICES_DIR}/hasura-backend-plus && yarn install --loglevel=error && yarn build && yarn start`,
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
      },
    },
    {
      name: "actions",
      script: `cd ${SERVICES_DIR}/actions && yarn install --loglevel=error && yarn start`,
      out_file: null,
      env: {
        NODE_ENV: "production",
        LOGGER_ENV: "production",
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
        AWS_S3_BUCKET_NAME,
        JWT_EXPIRES_IN,
        JWT_ALGORITHM,
        JWT_CLAIMS_NAMESPACE,
        JWT_KEY,
        REDIS_ADDR,
      },
    },
    {
      name: "cubejs",
      script: `cd ${SERVICES_DIR}/cubejs && yarn install --loglevel=error && yarn start`,
      env: {
        PORT: CUBEJS_PORT,
        HASURA_ENDPOINT,
        CUBEJS_SECRET,
        CUBEJS_CUBESTORE_HOST,
        CUBEJS_CUBESTORE_PORT,
        CUBEJS_SQL_PORT,
        CUBEJS_PG_SQL_PORT,
        CUBEJS_DB_CLICKHOUSE_READONLY,
        CUBEJS_SCHEDULED_REFRESH,
        CUBEJS_REFRESH_TIMER,
        CUBEJS_SQL_API,
        JWT_EXPIRES_IN,
        JWT_ALGORITHM,
        JWT_CLAIMS_NAMESPACE,
        JWT_KEY,
        REDIS_ADDR,
      },
    },
    {
      name: "nginx",
      out_file: null,
      env: {
        HASURA_GRAPHQL_ENDPOINT: "/v1/graphql",
        HASURA_WS_ENDPOINT: "/v1/graphql",
        GRAPHQL_PLUS_SERVER_URL: "",
        CUBEJS_PG_API_URL,
        CUBEJS_MYSQL_API_URL,
        CUBEJS_REST_API_URL,
        CUBEJS_API_DOCS_URL,
      },
      script:
        'envsubst < /app/nginx/default.conf.template > /etc/nginx/sites-enabled/default && nginx -g "daemon off;"',
    },
    {
      name: "wait_ready",
      script: `node ${WORK_DIR}/wait-on.js`,
      autorestart: false,
    },
  ],
};
