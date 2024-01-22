#! /bin/bash

docker run -d -p 80:8888 -p 15432:15432 -p 13306:13306 -p 4000:4000 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://username:password@hostname:port/dbname \
       -e CUBEJS_CUBESTORE_HOST=localhost \
       synmetrix/stack:latest
