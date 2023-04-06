# Datasources

## Materialize

Tested on [materialize/materialized:latest](https://hub.docker.com/r/materialize/materialized) image

docker-compose.dev.yml add:

```
  materialized:
    image: materialize/materialized:latest
    ports:
      - 6875:6875
      - 6876:6876
    networks:
      - mlcraft_default
```

Add datasource in mlcraft ui with:

- host: materialized
- port: 6876

Click "Check connection" button.