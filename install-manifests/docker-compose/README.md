# MLCraft on Docker

This Docker Compose setup runs [MLCraft](https://github.com/mlcraft-io/mlcraft) along with Postgres using `docker-compose`.

## Pre-requisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Usage

- Clone this repo on a machine where you'd like to deploy MLCraft
- `docker-compose up -d`

MLCraft itself will be available on `http://localhost/`

GraphQL endpoint will be `http://localhost/v1/graphql`

Admin Console (Hasura Console) will be available on `http://localhost/console`

## Connecting to External Postgres

If you want to connect to an external/existing postgres database, replace `HASURA_GRAPHQL_DATABASE_URL` in `docker-compose.yaml` with your database url. 

## SMTP credentials

Please, provide SMTP credentails if you want to receive emails from MLCraft. Without SMTP settings Magic Link and Team Invites will not work.

```
SMTP_HOST: ${SECRETS_SMTP_HOST}
SMTP_PORT: ${SECRETS_SMTP_PORT}
SMTP_SECURE: ${SECRETS_SMTP_SECURE}
SMTP_USER: ${SECRETS_SMTP_USER}
SMTP_PASS: ${SECRETS_SMTP_PASS}
SMTP_SENDER: ${SECRETS_SMTP_SENDER}
```

## AWS credentials

You also should provide AWS credentails if you want to use scheduled reports.

```
AWS_S3_ACCESS_KEY_ID: ${SECRETS_AWS_S3_ACCESS_KEY_ID}
AWS_S3_SECRET_ACCESS_KEY: ${SECRETS_AWS_S3_SECRET_ACCESS_KEY}
AWS_S3_BUCKET_NAME: ${SECRETS_AWS_S3_BUCKET_NAME}
```
