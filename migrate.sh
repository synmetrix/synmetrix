export HASURA_GRAPHQL_ADMIN_SECRET=agGdvASmKl
python3 cli.py hasura cli migrate apply
python3 cli.py hasura cli seeds apply

python3 cli.py hasura cli metadata apply
