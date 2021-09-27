<p align="center"><a href="https://mlcraft.io"><img src="https://i.imgur.com/lVUNQtT.png" alt="Cube.js" width="300px"></a></p>

[Website](https://mlcraft.io) • [Docs](./docs/README.md) • [Cube.js Schema docs](https://cube.dev/docs/getting-started-cubejs-schema) • [Docker Hub](https://hub.docker.com/u/mlcraft) • [Slack community](https://join.slack.com/t/mlcraft/shared_invite/zt-vg2tk8dh-sKA_W67BBcLLGXEKX78~dQ)


__MLCraft is a low-code metrics layer and a modern open-source alternative to Looker.__ 

MLCraft (Metrics Layer Craft) originally was designed to extract and transform the data from several data warehouses and run machine learning experiments. [Cube.js](https://github.com/cube-js/cube.js/) is used as a primary query layer and makes it suitable for handling
trillions of data points.

We offer a new way of working with data – it's called metrics store.

* Access insights with confidence, keep teams up-to-date on metrics changes, build institutional knowledge with stakeholders to empower your decision-making

* Take advantage of an enterprise-level metrics platform that allows you to visualize key insights via an easy GraphQL API or JDBC client

* Create individual dashboards for different roles and teams or stakeholder groups, and track changes across multiple data sources with a unified dashboard

## Features
* **Data modeling**: a [Cube.js](https://github.com/cube-js/cube.js/) Data Schema is used to model raw data into meaningful business metrics, transform and pre-aggregate data for optimal results.
* **Version control**: manage schema changes with version control, rollback fast to the valid one.
* **Auto testing and documentation**: good documentation and data testing will help downstream consumers curate the datasets.
* **Metrics Governance**: keep an eye on metrics changes, know data owners and contributors, understand the context rapidly.
* **Multitenancy and row-level security**: collaborate on the metrics and warehouses together with your team.
* **Query orchestration and multi-level caching**: any production-ready analytics solution requires key components such as analytic SQL generation, query results caching and execution orchestration.

note: not all features are deployed yet. Please, sync with our [roadmap](https://github.com/mlcraft-io/mlcraft/projects). Leave your email in the newsletter form on [mlcraft.io](https://mlcraft.io) if you would know about new features.

<div align="center">
  <a href="https://youtu.be/-ivNme3sfGs"><img src="https://i.imgur.com/RW7wKI9.png" alt="MLCraft BI Demo"></a>
</div>

## Use cases

* Team Business Intelligence
* Events collection & Event analytics
* Machine Learning
* Reverse ETL (as a single source of truth)
* Business Metrics governance
* Metrics metadata management

---

If you want to schedule a 20-min call with our team to help you get set up, please select [some time directly here](https://calendly.com/mlcraft-io/video-meeting).

------

## Demo

Demo: [app.mlcraft.org](https://app.mlcraft.org)

Login: `demo@mlcraft.io`

Password: `demodemo`

## Quick start

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

## Local development 

### Prerequisites

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)
- Python3 (with pip3)
- Node.js 8.9+ with `yarn` installed

```
git clone https://github.com/mlcraft-io/mlcraft.git
cd mlcraft
bash init.sh
```

To start UI in dev mode:

```
python3 cli.py ui
```

Then visit [http://localhost:3000](http://localhost:3000)

---

To start containers manually:

```
python3 cli.py services up
```

To destroy all services (volumes will still present):

```
python3 cli.py services destroy
```

Also check:

```
python3 cli.py --help
```

## Community support

For general help using MLCraft, please refer to the official MLCraft documentation. For additional help, you can use one of these channels to ask a question:

* [Slack](https://join.slack.com/t/mlcraft/shared_invite/zt-vg2tk8dh-sKA_W67BBcLLGXEKX78~dQ) \(For live discussion with the Community and MLCraft team\)
* [GitHub](https://github.com/mlcraft-io/mlcraft) \(Bug reports, Contributions\)
* [Twitter](https://twitter.com/mlcraft_io) \(Get the news fast\)

## Roadmap

Check out our [roadmap](https://github.com/mlcraft-io/mlcraft/projects) to get informed on what we are currently working on, and what we have in mind for the next weeks, months and years.

## License

The core MLCraft is available under the [Apache License 2.0](https://github.com/mlcraft-io/mlcraft/blob/main/LICENSE) (Apache-2.0).

All **other contents** are available under the [MIT License](LICENSE-community).

## Authors

[@ifokeev](https://github.com/ifokeev)

[@ilyozzz](https://github.com/ilyozzz)

[@Libertonius](https://github.com/Libertonius)
