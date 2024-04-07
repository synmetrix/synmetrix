# Environment Variables Description

This document outlines the environment variables used in the project.

## Core Variables

- `NODE_ENV` - Defines the environment in which the application is running. The `production` value indicates a production environment.
- `HASURA_GRAPHQL_ADMIN_SECRET` - The admin secret key for accessing GraphQL [Hasura](https://github.com/hasura/graphql-engine).
- `HASURA_GRAPHQL_DATABASE_URL` - URL for connecting [Hasura](https://github.com/hasura/graphql-engine) to the PostgreSQL database.
- `DATABASE_URL` - The URL for connecting to the PostgreSQL for [Hasura Backend Plus](https://github.com/nhost/hasura-backend-plus).
- `APP_FRONTEND_URL` - The URL of the application frontend.

## PostgreSQL Database

- `POSTGRES_HOST` - The host for the PostgreSQL database.
- `POSTGRES_USER` - The PostgreSQL database user.
- `POSTGRES_PASSWORD` - The password for accessing the PostgreSQL database.
- `POSTGRES_DB` - The name of the PostgreSQL database.

## Amazon S3 Storage

- `AWS_S3_ENDPOINT` - The endpoint for accessing Amazon S3.
- `AWS_S3_ACCESS_KEY_ID` - The access key ID for Amazon S3.
- `AWS_S3_SECRET_ACCESS_KEY` - The secret access key for Amazon S3.
- `AWS_S3_REGION` - The region of the Amazon S3 storage.
- `AWS_S3_BUCKET_NAME` - The name of the Amazon S3 bucket.

The Amazon S3 storage is used for internal data exchange and the generation of visual reports, allowing for efficient management and dissemination of processed data within the organization and facilitating convenient access to reports for analysis and decision-making.

## Minio Storage

- `MINIO_ROOT_USER` - The root user for Minio.
- `MINIO_ROOT_PASSWORD` - The root user's password for Minio.
- `MINIO_DEFAULT_REGION` - The default region for Minio.

Minio serves as an open-source alternative to Amazon S3. It is an S3-compatible cloud storage designed for building private clouds. Minio enables organizations to store large volumes of data independently of third-party cloud providers while ensuring high data performance and availability.

## SMTP Mail Server

- `SMTP_HOST` - The host of the SMTP server.
- `SMTP_PORT` - The port of the SMTP server.
- `SMTP_SECURE` - Whether to use encryption for SMTP.
- `SMTP_USER` - The user for the SMTP server.
- `SMTP_PASS` - The password for the SMTP server.
- `SMTP_SENDER` - The email sender for SMTP.

SMTP is used for sending invitations, registering new users, and email-based login. It provides a secure and efficient method of communication with users, notifying them about important events, account changes, or requiring action confirmation via email.

## Let's Encrypt

- `LETSENCRYPT_EMAIL` - The email address for notifications from Let's Encrypt. Used by [Traefik](https://github.com/traefik/traefik) to generate SSL certificates for the project domain.