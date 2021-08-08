#!/bin/bash

cd /hasura || {
    echo "Hasura folder '/hasura' not found"
    exit 1
}

socat TCP-LISTEN:8080,fork TCP:graphql_server:8080 &
socat TCP-LISTEN:9695,fork,reuseaddr,bind=hasura_dev_console TCP:127.0.0.1:9695 &
socat TCP-LISTEN:9693,fork,reuseaddr,bind=hasura_dev_console TCP:127.0.0.1:9693 &

hasura console --log-level DEBUG --address "127.0.0.1" --no-browser || exit 1
