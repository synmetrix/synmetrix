python3 cli.py hasura cli "migrate apply --all-databases"
python3 cli.py hasura cli "seeds apply --database-name default"

python3 cli.py hasura cli metadata apply
python3 cli.py hasura cli metadata reload