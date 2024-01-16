<p align="center"><a href="https://mlcraft.io"><img src="https://i.imgur.com/lVUNQtT.png" alt="Cube.js" width="300px"></a></p>

[Website](https://mlcraft.io) • [Docs](./docs/README.md) • [Cube.js Models docs](https://cube.dev/docs/schema/getting-started) • [Docker Hub](https://hub.docker.com/u/mlcraft) • [Slack community](https://join.slack.com/t/mlcraft/shared_invite/zt-1x2gxwn37-J3tTvCR5xSFVfxwUU_YKtg)


# MLCraft

MLCraft is an open source data engineering platform and semantic layer for centralized metrics management. It provides a complete framework for modeling, integrating, transforming, aggregating, and distributing metrics data at scale.

## Key Features

-   **Data modeling and transformations**: Flexibly define metrics and dimensions using SQL and [Cube](https://github.com/cube-js/cube) data models. Apply transformations and aggregations.
-   **Semantic layer**: Consolidate metrics from across sources into a unified, governed data model. Eliminate metric definition differences.
-   **Scheduled reports and alerts**: Monitor metrics and get notified of changes via configurable reports and alerts.
-   **Versioning**: Track schema changes over time for transparency and auditability.
-   **Role-based access control**: Manage permissions for data models and metrics access.
-   **Data exploration**: Analyze metrics through the UI, or integrate with any BI tool via the SQL API.
-   **Caching**: Optimize performance using pre-aggregations and caching from [Cube](https://github.com/cube-js/cube).
-   **Teams**: Collaborate on metrics modeling across your organization.

## Overview

MLCraft leverages [Cube (Cube.js)](https://github.com/cube-js/cube) to implement flexible data models that can consolidate metrics from across warehouses, databases, APIs and more. This unified semantic layer eliminates differences in definitions and calculations, providing a single source of truth.

The metrics data model can then be distributed downstream to any consumer via a SQL API, allowing integration into BI tools, reporting, dashboards, data science, and more.

By combining best practices from data engineering, like caching, orchestration, and transformation, with self-service analytics capabilities, MLCraft speeds up data-driven workflows from metrics definition to consumption.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)


### Step 1: Get the docker-compose file

The [mlcraft-io/mlcraft/install-manifests](https://github.com/mlcraft-io/mlcraft/tree/main/install-manifests) repo
contains all installation manifests required to deploy MLCraft anywhere. Get the docker compose file from there:

```
# in a new directory run
wget https://raw.githubusercontent.com/mlcraft-io/mlcraft/main/install-manifests/docker-compose/docker-compose.yml
# or run
curl https://raw.githubusercontent.com/mlcraft-io/mlcraft/main/install-manifests/docker-compose/docker-compose.yml -o docker-compose.yml
```

NOTE: Please check environment variables in the `docker-compose.yml` file. You can change them if needed.

### Step 2: Run MLCraft

The following command will run MLCraft along with a Postgres database to store its data.

```
$ docker-compose up -d
```

Check if the containers are running:

```
$ docker ps

CONTAINER ID IMAGE                 ... CREATED STATUS PORTS          ...
c8f342d086f3 mlcraft/mlcraft-stack ... 1m ago  Up 1m  80->8888/tcp ...
30ea14ddaa5e postgres:12           ... 1m ago  Up 1m  5432/tcp    
```

It will take about 2-5 minutes to install all dependencies, wait until `MLCraft Stack is ready` message.
Read logs by `docker-compose logs -f` to understand if it's finished.

### Step 3: Try out MLCraft

MLCraft itself will be available on `http://localhost/`

GraphQL endpoint will be `http://localhost/v1/graphql`

Admin Console (Hasura Console) will be available on `http://localhost/console`

NOTE: check out `HASURA_GRAPHQL_ADMIN_SECRET` in the `docker-compose` file. You'll need it to enter the Admin Console.


## Documentation

-   [Official Documentation](https://docs.synmetrix.org/)
-   [Cube Documentation](https://cube.dev/docs)

## Demo

Demo: [app.mlcraft.org](https://app.mlcraft.org)
* Login: `demo@mlcraft.io`
* Password: `demodemo`


----


## Data Modeling

MLCraft leverages Cube for flexible data modeling and transformations.

Cube implements a multi-stage SQL data modeling architecture:

-   Raw data sits in a source database such as Postgres, MySQL, etc.
-   The raw data is modeled into reusable data marts using Cube Data Models files. These models files allow defining metrics, dimensions, granularities and relationships.
-   The models act as an abstraction layer between the raw data and application code.
-   Cube then generates optimized analytical SQL queries against the raw data based on the model.
-   The Cube Store distributed cache optimizes query performance by caching query results.

This modeling architecture makes it simple to create fast and complex analytical queries with Cube that are optimized to run against large datasets.

The unified data model can consolidate metrics from across different databases and systems, providing a consistent semantic layer for end users.

## Cube Store

For production workloads, MLCraft uses Cube Store as the caching and query execution layer.

Cube Store is a purpose-built database for operational analytics, optimized for fast aggregations and time series data. It provides:

-   Distributed querying for scalability
-   Advanced caching for fast queries
-   columnar storage for analytics performance
-   Integration with Cube for modeling

By leveraging Cube Store and Cube together, MLCraft benefits from excellent analytics performance and flexibility in modeling metrics.

---

## Community support

For general help using MLCraft, please refer to the official MLCraft documentation. For additional help, you can use one of these channels to ask a question:

* [Slack](https://join.slack.com/t/mlcraft/shared_invite/zt-1x2gxwn37-J3tTvCR5xSFVfxwUU_YKtg) / For live discussion with the Community and MLCraft team
* [GitHub](https://github.com/mlcraft-io/mlcraft) / Bug reports, Contributions

## Roadmap

Check out our [roadmap](https://github.com/mlcraft-io/mlcraft/projects) to get informed on what we are currently working on, and what we have in mind for the next weeks, months and years.

## License

The core MLCraft is available under the [Apache License 2.0](https://github.com/mlcraft-io/mlcraft/blob/main/LICENSE) (Apache-2.0).

All **other contents** are available under the [MIT License](LICENSE-community).

## Authors

[@ifokeev](https://github.com/ifokeev)

[@Libertonius](https://github.com/Libertonius)

[@ilyozzz](https://github.com/ilyozzz)