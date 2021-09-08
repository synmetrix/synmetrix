<p align="center"><a href="https://mlcraft.io"><img src="https://i.imgur.com/lVUNQtT.png" alt="Cube.js" width="300px"></a></p>

[Website](https://mlcraft.io) • [Docs](./docs/SUMMARY.md) • [Cube.js Schema docs](https://cube.dev/docs/getting-started-cubejs-schema) • [Docker Hub](https://hub.docker.com/u/mlcraft) • [Slack community](https://join.slack.com/t/mlcraft/shared_invite/zt-vg2tk8dh-sKA_W67BBcLLGXEKX78~dQ)


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

------

## Demo

Demo: [app.mlcraft.org](https://app.mlcraft.org)

Login: `demo@mlcraft.io`

Password: `demodemo`

## Quick Start 

NOTE: Please, install `python3`, `pip3`, `yarn` and `node` on your host machine before.

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

If you want to schedule a 20-min call with our team to help you get set up, please select [some time directly here](https://calendly.com/mlcraft-io/video-meeting).

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

* [Slack](https://join.slack.com/t/mlcraft/shared_invite/zt-vg2tk8dh-sKA_W67BBcLLGXEKX78~dQ) \(For live discussion with the Community and Airbyte team\)
* [GitHub](https://github.com/mlcraft/mlcraft) \(Bug reports, Contributions\)
* [Twitter](https://twitter.com/mlcraft_io) \(Get the news fast\)

## Roadmap

Check out our [roadmap](https://github.com/mlcraft-io/mlcraft/projects) to get informed on what we are currently working on, and what we have in mind for the next weeks, months and years.

## License

MLCraft is licensed under the MIT license. See the [LICENSE](https://github.com/mlcraft-io/mlcraft/blob/main/LICENSE) file for licensing information.

## Authors

[@ifokeev](https://github.com/ifokeev)

[@ilyozzz](https://github.com/ilyozzz)

[@Libertonius](https://github.com/Libertonius)
