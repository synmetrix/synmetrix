export HASURA_GRAPHQL_ADMIN_SECRET=${HASURA_GRAPHQL_ADMIN_SECRET:-"devsecret"}

./cli.sh compose up --init
./migrate.sh