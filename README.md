<p align="center"><a href="https://synmetrix.org"><img src="https://raw.githubusercontent.com/mlcraft-io/client-v2/master/src/assets/logo_with_text.png" alt="Synmetrix" width="300px"></a></p>

<p align="center">
<a href="https://synmetrix.org">Website</a> • <a href="https://docs.synmetrix.org">Docs</a> • <a href="https://cube.dev/docs/schema/getting-started">Cube.js Models docs</a> • <a href="https://hub.docker.com/u/synmetrix">Docker Hub</a> • <a href="https://join.slack.com/t/mlcraft/shared_invite/zt-1x2gxwn37-J3tTvCR5xSFVfxwUU_YKtg">Slack community</a>
</p>

<div align="center">
  <a href="README.md">Readme in English</a> • 
  <a href="README_CN.md">Readme in Chinese</a> • 
  <a href="README_RU.md">Readme in Russian</a>
</div>

# Synmetrix

Synmetrix (prev. MLCraft) is an open source data engineering platform and semantic layer for centralized metrics management. It provides a complete framework for modeling, integrating, transforming, aggregating, and distributing metrics data at scale.

### Key Features

- **Data modeling and transformations**: Flexibly define metrics and dimensions using SQL and [Cube](https://github.com/cube-js/cube) data models. Apply transformations and aggregations.
- **Semantic layer**: Consolidate metrics from across sources into a unified, governed data model. Eliminate metric definition differences.
- **Scheduled reports and alerts**: Monitor metrics and get notified of changes via configurable reports and alerts.
- **Versioning**: Track schema changes over time for transparency and auditability.
- **Role-based access control**: Manage permissions for data models and metrics access.
- **Data exploration**: Analyze metrics through the UI, or integrate with any BI tool via the SQL API.
- **Caching**: Optimize performance using pre-aggregations and caching from [Cube](https://github.com/cube-js/cube).
- **Teams**: Collaborate on metrics modeling across your organization.

![Synmetrix – Open Source Semantic Layer](https://synmetrix.org/assets/6542558ce0ae954c7fb97894_Open%20Graph-min.webp)

## Overview

Synmetrix leverages [Cube (Cube.js)](https://github.com/cube-js/cube) to implement flexible data models that can consolidate metrics from across warehouses, databases, APIs and more. This unified semantic layer eliminates differences in definitions and calculations, providing a single source of truth.

The metrics data model can then be distributed downstream to any consumer via a SQL API, allowing integration into BI tools, reporting, dashboards, data science, and more.

By combining best practices from data engineering, like caching, orchestration, and transformation, with self-service analytics capabilities, Synmetrix speeds up data-driven workflows from metrics definition to consumption.

### Use cases

1. **Data Democratization**: Synmetrix makes data accessible to non-experts, enabling everyone in an organization to make data-driven decisions easily.

2. **Business Intelligence (BI) and Reporting**: Integrate Synmetrix with any BI tool for advanced reporting and analytics, enhancing data visualization and insights.
  - [Integrating Synmetrix with Apache Superset](https://github.com/mlcraft-io/examples/tree/main/superset) ([Video](https://www.youtube.com/watch?v=TzLy88IAYZo))

3. **Embedded Analytics**: Use the Synmetrix API to embed analytics directly into applications, providing users with real-time data insights within their workflows.
  - [Integrating Synmetrix with Observable: A Quick Guide](https://github.com/mlcraft-io/examples/tree/main/observable) ([Video](https://www.youtube.com/watch?v=VcAP4vrL8cY))
  - [Guide to Connecting Synmetrix with DBeaver Using SQL API](https://github.com/mlcraft-io/examples/tree/main/dbeaver) ([Video](https://www.youtube.com/watch?v=8l_Ud3IM0OQ))

4. **Semantic Layer for LLM**: Enhance LLM's accuracy in data handling and queries with Synmetrix's semantic layer, improving data interaction and precision.
  - [Synmetrix with Large Language Model (LLM) example](https://github.com/mlcraft-io/examples/tree/main/langchain) ([Video](https://www.youtube.com/watch?v=TtH-pFGDK84))

# Getting Started

### Prerequisite Software

Ensure the following software is installed before proceeding:

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)

### Step 1: Download the docker-compose file

The repository [mlcraft-io/mlcraft/install-manifests](https://github.com/mlcraft-io/mlcraft/tree/main/install-manifests) houses all the necessary installation manifests for deploying Synmetrix anywhere. You can download the docker compose file from this repository:

Execute this in a new directory
```
wget https://raw.githubusercontent.com/mlcraft-io/mlcraft/main/install-manifests/docker-compose/docker-compose.yml
```

Alternatively, you can use `curl`

```
curl https://raw.githubusercontent.com/mlcraft-io/mlcraft/main/install-manifests/docker-compose/docker-compose.yml -o docker-compose.yml
```

NOTE: Ensure to review the [environment variables](docs/environments.md) in the docker-compose.yml file. Modify them as necessary.

### Step 2: Launch Synmetrix

Execute the following command to start Synmetrix along with a Postgres database for data storage.

```
docker-compose pull stack && docker-compose up -d
```

Verify if the containers are operational:

```
docker ps
```

Output:
```
CONTAINER ID IMAGE                 ... CREATED STATUS PORTS          ...
c8f342d086f3 synmetrix/stack       ... 1m ago  Up 1m  80->8888/tcp ...
30ea14ddaa5e postgres:12           ... 1m ago  Up 1m  5432/tcp  
```

The installation of all dependencies will take approximately 5-7 minutes. Wait until you see the `Synmetrix Stack is ready` message. You can view the logs using `docker-compose logs -f` to confirm if the process has completed.

#### Running Synmetrix on ARM64v8 Architecture

First, it's recommended to install [Rosetta 2](https://support.apple.com/en-gb/102527) on your Mac. This will allow Docker to run ARM64v8 containers. Since Docker [version 4.25](https://www.docker.com/blog/docker-desktop-4-25/) it allows to run ARM64v8 containers natively, but some users still encounter issues without Rosetta installed.

For ARM64v8, Cubestore requires a specific version. Update the Cubestore version in the docker-compose file to include the `-arm64v8` suffix. For instance, use `v0.35.33-arm64v8` (refer to the [Cubestore tags on Docker Hub](https://hub.docker.com/r/cubejs/cubestore/tags) for the latest version).

To run the docker-compose file for ARM64v8, use the following command:

```
docker-compose pull stack && CUBESTORE_VERSION=v0.35.33-arm64v8 docker-compose up -d
```

Video guide (MacOS, M3 Max processor):

[![Video guide](https://img.youtube.com/vi/nLorFq-WpGw/0.jpg)](https://youtu.be/nLorFq-WpGw)

### Step 3: Explore Synmetrix

* You can access Synmetrix at [http://localhost/](http://localhost/)
* The GraphQL endpoint is located at [http://localhost/v1/graphql](http://localhost/v1/graphql)
* The Admin Console (Hasura Console) can be found at [http://localhost/console](http://localhost/console)
* The Cube Swagger API can be found at [http://localhost:4000/docs](http://localhost:4000/docs)

#### Important Notes

1. **Admin Console Access**: Ensure to check `HASURA_GRAPHQL_ADMIN_SECRET` in the docker-compose file. This is mandatory for accessing the Admin Console. The default value is `adminsecret`. Remember to modify this in a production environment.

2. **Environment Variables**: Set up all necessary environment variables. Synmetrix will function with the default values, but certain features might not perform as anticipated.

3. **Preloaded Seed Data**: The project is equipped with preloaded seed data. Use the credentials below to sign in:
    - Email:  `demo@synmetrix.org`
    - Password:  `demodemo`

    This account is pre-configured with two demo datasources and their respective SQL API access. For SQL operations, you can use the following credentials with any PostgreSQL client tool such as DBeaver or TablePlus:

    | Host      | Port  | Database | User                 | Password              |
    |-----------|-------|----------|----------------------|-----------------------|
    | localhost | 15432 | db       | demo_pg_user         | demo_pg_pass          |
    | localhost | 15432 | db       | demo_clickhouse_user | demo_clickhouse_pass  |

## Documentation

- [Official Documentation](https://docs.synmetrix.org/)
- [Cube Documentation](https://cube.dev/docs)

---

## Demo online

Demo: [app.synmetrix.org](https://app.synmetrix.org)

* Login: `demo@synmetrix.org`
* Password: `demodemo`

### Database demo credentials

| Database type | Host                        | Port | Database | User | Password    | SSL   |
| ------------- | --------------------------- | ---- | -------- | ---- | ----------- | ----- |
| ClickHouse    | gh-api.clickhouse.tech      | 443  | default  | play | no password | true  |
| PostgreSQL    | demo-db-examples.cube.dev   | 5432 | ecom     | cube | 12345       | false |

---

## Data Modeling

Synmetrix leverages Cube for flexible data modeling and transformations.

Cube implements a multi-stage SQL data modeling architecture:

- Raw data sits in a source database such as Postgres, MySQL, etc.
- The raw data is modeled into reusable data marts using Cube Data Models files. These models files allow defining metrics, dimensions, granularities and relationships.
- The models act as an abstraction layer between the raw data and application code.
- Cube then generates optimized analytical SQL queries against the raw data based on the model.
- The Cube Store distributed cache optimizes query performance by caching query results.

This modeling architecture makes it simple to create fast and complex analytical queries with Cube that are optimized to run against large datasets.

The unified data model can consolidate metrics from across different databases and systems, providing a consistent semantic layer for end users.

## Cube Store

For production workloads, Synmetrix uses Cube Store as the caching and query execution layer.

Cube Store is a purpose-built database for operational analytics, optimized for fast aggregations and time series data. It provides:

- Distributed querying for scalability
- Advanced caching for fast queries
- columnar storage for analytics performance
- Integration with Cube for modeling

By leveraging Cube Store and Cube together, Synmetrix benefits from excellent analytics performance and flexibility in modeling metrics.

#### Benchmarks

- [Synmetrix with Cube: Caching and Highload](https://github.com/mlcraft-io/examples/tree/main/benchmarks)

---

## Ecosystem

| Repository                                                   | Description        |
| ------------------------------------------------------------ | ------------------ |
| [mlcraft-io/mlcraft](https://github.com/mlcraft-io/mlcraft)     | Synmetrix Monorepo |
| [mlcraft-io/client-v2](https://github.com/mlcraft-io/client-v2) | Synmetrix Client   |
| [mlcraft-io/docs](https://github.com/mlcraft-io/docs)           | Synmetrix Docs     |
| [mlcraft-io/examples](https://github.com/mlcraft-io/examples)           | Synmetrix Examples     |

## Community support

For general help using Synmetrix, please refer to the official Synmetrix documentation. For additional help, you can use one of these channels to ask a question:

* [Slack](https://join.slack.com/t/mlcraft/shared_invite/zt-1x2gxwn37-J3tTvCR5xSFVfxwUU_YKtg) / For live discussion with the Community and Synmetrix team
* [GitHub](https://github.com/mlcraft-io/mlcraft) / Bug reports, Contributions
* [Twitter](https://twitter.com/trySynmetrix) / Updates and news
* [Youtube](https://www.youtube.com/channel/UCEPlxaWYrdOaf9IXjD2IRTg) / Video tutorials and demos

## Roadmap

Check out our [roadmap](https://github.com/mlcraft-io/mlcraft/projects) to get informed on what we are currently working on, and what we have in mind for the next weeks, months and years.

## License

The core Synmetrix is available under the [Apache License 2.0](https://github.com/mlcraft-io/mlcraft/blob/main/LICENSE) (Apache-2.0).

All **other contents** are available under the [MIT License](LICENSE-community).

## Hardware requirements

| Component       | Requirement                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| Processor (CPU) | 3.2 GHz or higher, modern processor with multi-threading and virtualization support. |
| RAM             | 8 GB or more to handle computational tasks and data processing.                      |
| Disk Space      | At least 30 GB of free space for software installation and storing working data.     |
| Network         | Internet connectivity is required for cloud services and software updates.           |

## Authors

[@ifokeev](https://github.com/ifokeev), [@Libertonius](https://github.com/Libertonius), [@ilyozzz](https://github.com/ilyozzz)
