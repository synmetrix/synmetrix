module.exports = {
  apps : [
    {
      name   : 'client',
      script : 'cd mlcraft/services/client && yarn install && yarn run build && cd build && npx serve'
    },
    {
      name   : 'hasura',
      script : './graphql-engine serve'
    },
    {
      name   : 'hasura_migrations',
      script : 'cd mlcraft/services/hasura && hasura migrate apply'
    },
    /*
    {
      name   : 'hasura_metadata',
      script : 'cd mlcraft/services/hasura && hasura metadata apply'
    },
    */
    {
      name   : 'hasura_plus',
      script : 'cd hasura-backend-plus && yarn install && yarn run build && yarn start'
    },
    /*
    {
      name   : 'actions',
      script : 'cd mlcraft/services/actions && yarn install && yarn start'
    },
    {
      name   : 'cubejs',
      script : 'cd mlcraft/services/cubejs && yarn install && yarn start'
    },
    */
  ]
};
