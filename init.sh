export HASURA_GRAPHQL_ADMIN_SECRET=${HASURA_GRAPHQL_ADMIN_SECRET:-"devsecret"}

./cli.sh compose up --init --build

./cli.sh hasura cli "migrate apply --database-name default --version 1628429118205" --build

# wait until hasura auth is ready
sleep 5

./migrate.sh