#!/bin/bash

cd /hasura || {
    echo "Hasura folder '/hasura' not found"
    exit 1
}

socat TCP-LISTEN:8080,fork TCP:hasura:8080 &

hasura-cli console --log-level DEBUG --address 0.0.0.0 --no-browser || exit 1
