# Materialize

Tested on the [materialize/materialized:latest](https://hub.docker.com/r/materialize/materialized) image.

## Step 1: Add the Materialize service to your docker-compose.dev.yml file

Open the `docker-compose.dev.yml` file and add the following configuration:

```
  materialized:
    image: materialize/materialized:latest
    ports:
      - 6876:6876
      - 6875:6875
    networks:
      - mlcraft_default
```

## Step 2: Start the services

Run the following command to start the services:

```bash
python3 cli.py services up
```

## Step 3: Add a data source in the mlcraft UI

Go to the mlcraft UI and add a new data source with the following parameters:

- Host: materialized
- Port: 6875
- Database name: Test
- User: user

## Step 4: Test the connection

Click the "Check connection" button in the mlcraft UI to verify the connection to the Materialize data source. If the connection is successful, you will see a confirmation message.