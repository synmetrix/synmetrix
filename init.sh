export HASURA_GRAPHQL_ADMIN_SECRET=agGdvASmKl

./create-network.sh

python3 cli.py services up
./migrate.sh
