export HASURA_GRAPHQL_ADMIN_SECRET=devsecret

./create-network.sh

python3 cli.py services up
./migrate.sh
