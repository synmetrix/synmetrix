export HASURA_GRAPHQL_ADMIN_SECRET=devsecret

./scripts/create-network.sh

./cli.sh services up
./migrate.sh
