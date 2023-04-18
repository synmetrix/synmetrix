#!/bin/bash

# Start Elasticsearch and Kibana services
docker-compose up -d

while [ "$(docker inspect -f '{{.State.Running}}' elasticsearch_elasticsearch_1)" != "true" ]; do
  sleep 1
done

# Step 3: Create a new user
curl -X POST -u elastic:password "http://localhost:9200/_security/user/user" -H 'Content-Type: application/json' -d'
{
  "password": "password",
  "roles": ["kibana","kibana_system"],
  "full_name": "Test user"
}'
