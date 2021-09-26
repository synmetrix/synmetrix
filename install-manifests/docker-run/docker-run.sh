#! /bin/bash

docker run -d -p 80:8888 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://username:password@hostname:port/dbname \
       mlcraft/mlcraft-stack:v1.0.0
