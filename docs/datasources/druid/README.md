# Druid Setup Guide

## Step 1: Add the Druid cluster configuration to `docker-compose.dev`

```
services:
  # ...previous services
  postgres_test:
    container_name: postgres_test
    image: postgres:latest
    volumes:
      - metadata_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=FoolishPassword
      - POSTGRES_USER=druid
      - POSTGRES_DB=druid

  zookeeper:
    container_name: zookeeper
    hostname: zookeeper
    image: zookeeper:3.5
    ports:
      - "2181:2181"
    environment:
      - ZOO_MY_ID=1
      - druid_host=zookeeper
    env_file:
      - environment
    networks:
      - mlcraft_default

  coordinator:
    image: apache/druid:25.0.0
    container_name: coordinator
    hostname: coordinator
    volumes:
      - druid_shared:/opt/shared
      - coordinator_var:/opt/druid/var
    depends_on: 
      - zookeeper
      - postgres_test
    ports:
      - "8084:8081"
    command:
      - coordinator
    environment:
      - druid_host=coordinator
    env_file:
      - environment
    networks:
      - mlcraft_default

  broker:
    image: apache/druid:25.0.0
    container_name: broker
    hostname: broker
    volumes:
      - broker_var:/opt/druid/var
    depends_on: 
      - zookeeper
      - postgres_test
      - coordinator
    ports:
      - "8082:8082"
    command:
      - broker
    environment:
      - druid_host=broker
    env_file:
      - environment
    networks:
      - mlcraft_default

  historical:
    image: apache/druid:25.0.0
    container_name: historical
    hostname: historical
    volumes:
      - druid_shared:/opt/shared
      - historical_var:/opt/druid/var
    depends_on: 
      - zookeeper
      - postgres_test
      - coordinator
    ports:
      - "8083:8083"
    command:
      - historical
    environment:
      - druid_host=historical
    env_file:
      - environment
    networks:
      - mlcraft_default

  middlemanager:
    image: apache/druid:25.0.0
    container_name: middlemanager
    hostname: middlemanager
    volumes:
      - druid_shared:/opt/shared
      - middle_var:/opt/druid/var
    depends_on: 
      - zookeeper
      - postgres_test
      - coordinator
    ports:
      - "8091:8091"
      - "8100-8105:8100-8105"
    command:
      - middleManager
    environment:
      - druid_host=middlemanager
    env_file:
      - environment
    networks:
      - mlcraft_default

  router:
    image: apache/druid:25.0.0
    container_name: router
    hostname: router
    volumes:
      - router_var:/opt/druid/var
    depends_on:
      - zookeeper
      - postgres_test
      - coordinator
    ports:
      - "8889:8888"
    command:
      - router
    environment:
      - druid_host=router
    env_file:
      - environment
    networks:
      - mlcraft_default

  cubestore:
    ports:
      - 3030:3030

volumes:
  # ...previous volumes
  metadata_data: {}
  middle_var: {}
  historical_var: {}
  broker_var: {}
  coordinator_var: {}
  router_var: {}
  druid_shared: {}
  grafana_data: {}
  kafka_data: {}
  zookeeper_data_kafka: {}
```

## Step 2: Add the `.test_env` file to the project root with the following content:

```
DRUID_SINGLE_NODE_CONF=micro-quickstart

druid_emitter_logging_logLevel=debug

druid_extensions_loadList=["druid-histogram", "druid-datasketches", "druid-lookups-cached-global", "postgresql-metadata-storage", "druid-multi-stage-query"]

druid_zk_service_host=zookeeper

druid_metadata_storage_host=
druid_metadata_storage_type=postgresql
druid_metadata_storage_connector_connectURI=jdbc:postgresql://postgres_test:5432/druid
druid_metadata_storage_connector_user=druid
druid_metadata_storage_connector_password=FoolishPassword

druid_coordinator_balancer_strategy=cachingCost

druid_indexer_runner_javaOptsArray=["-server", "-Xmx1g", "-Xms1g", "-XX:MaxDirectMemorySize=3g", "-Duser.timezone=UTC", "-Dfile.encoding=UTF-8", "-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager"]
druid_indexer_fork_property_druid_processing_buffer_sizeBytes=256MiB

druid_storage_type=local
druid_storage_storageDirectory=/opt/shared/segments
druid_indexer_logs_type=file
druid_indexer_logs_directory=/opt/shared/indexing-logs

druid_processing_numThreads=2
druid_processing_numMergeBuffers=2

DRUID_LOG4J=<?xml version="1.0" encoding="UTF-8" ?><Configuration status="WARN"><Appenders><Console name="Console" target="SYSTEM_OUT"><PatternLayout pattern="%d{ISO8601} %p [%t] %c - %m%n"/></Console></Appenders><Loggers><Root level="info"><AppenderRef ref="Console"/></Root><Logger name="org.apache.druid.jetty.RequestLog" additivity="false" level="DEBUG"><AppenderRef ref="Console"/></Logger></Loggers></Configuration>
```

## Step 3: Run the command `python3 cli.py services up`

Wait for the cluster to start and go to http://localhost:8889.

## Step 4: Check the services

Go to the Services tab and make sure all services are online, as shown in the screenshot below.

![All services online](/docs/images/druid1.png)

## Step 5: Load example data

Select the "Load data" tab, then choose "Batch - classic" from the dropdown menu.

![Load data -> Batch - classic](/docs/images/druid2.png)

Next, select the "Example data" tile and click "Load example".

![Load example data](/docs/images/druid3.png)

Click the button with the text "Next: ..." in the bottom right corner until the data starts loading (about 9 times). When the data starts loading, you will be redirected to the Ingestion tab and see the message "Task submitted successfully. Going to task view...".
After the data has finished loading, the task status will change to SUCCESS.

![Next button](/docs/images/druid4.png)

## Step 6: Create a new Druid datasource in MLCraft

Fill out the form with the following information:

Name: Druid test datasource
Url: http://broker:8082

Currently, the Test Connection feature is not implemented and always returns "OK". To ensure functionality, generate a schema and request any data in the Explore tab.
