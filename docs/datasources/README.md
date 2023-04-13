# Datasources

## Materialize

Tested on the [materialize/materialized:latest](https://hub.docker.com/r/materialize/materialized) image

Add the following to your docker-compose.dev.yml file:

```
  materialized:
    image: materialize/materialized:latest
    ports:
      - 6876:6876
      - 6875:6875
    networks:
      - mlcraft_default
```

Add a data source in the mlcraft UI with the following parameters:

- Host: materialized
- Port: 6875
- Database name: Test
- User: user

Click the "Check connection" button to verify the connection to the data source.