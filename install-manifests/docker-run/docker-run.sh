#! /bin/bash

docker run -d -p 80:8888 -p 15432:15432 -p 13306:13306 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://username:password@hostname:port/dbname \
       -e CUBEJS_CUBESTORE_HOST=localhost \
       mlcraft/mlcraft-stack:v1.0.0
