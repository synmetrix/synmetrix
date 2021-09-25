module.exports = {
  apps : [
    {
      name: 'client',
      script: 'cd mlcraft/services/client && yarn install && yarn run build && cd build && npx serve -s',
      env: {
        GRAPHQL_SERVER_URL: 'http://localhost:8080/v1/graphql',
        GRAPHQL_WS_URL: 'ws://localhost:8080/v1/graphql',
        GRAPHQL_PLUS_SERVER_URL: 'http://localhost:3030',
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
          type: process.env.JWT_ALGORITHM,
          key: process.env.JWT_KEY,
        }),
        AUTO_MIGRATE: true,
      }
    },
    {
      name: 'hasura_migrations',
      script: 'cd mlcraft/services/hasura && hasura migrate apply --skip-update-check',
      autorestart: false,
    },
    {
      name: 'hasura_metadata',
      script: 'cd mlcraft/services/hasura && hasura metadata apply --skip-update-check',
      autorestart: false,
    },
    {
      name: 'hasura_plus',
      script: 'cd hasura-backend-plus && yarn install && yarn run build && yarn start',
      env: {
        PORT: 3030,
        AUTO_ACTIVATE_NEW_USERS: true,
        DATABASE_URL: process.env.HASURA_GRAPHQL_DATABASE_URL,
      }
    },
    {
      name: 'actions',
      script: 'cd mlcraft/services/actions && yarn install && yarn start',
    },
    {
      name: 'cubejs',
      script: 'cd mlcraft/services/cubejs && yarn install && yarn start'
    },
  ]
};
