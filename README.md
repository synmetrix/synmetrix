<p align="center"><a href="https://mlcraft.io"><img src="https://i.imgur.com/lVUNQtT.png" alt="Cube.js" width="300px"></a></p>

[Website](https://mlcraft.io) • [Docs](./docs/SUMMARY.md) • [Cube.js Schema docs](https://cube.dev/docs/getting-started-cubejs-schema)

__MLCraft is an open-source low-code business intelligence tool and a data science workflow.__ 

MLCraft was designed to query the data from several data warehouses and run machine learning experiments. [Cube.js](https://github.com/cube-js/cube.js/) is used as a primary query layer and makes it suitable for handling
trillions of data points.

Most modern RDBMS are supported.

<div align="center">
  <a href="https://youtu.be/-ivNme3sfGs"><img src="https://i.imgur.com/RW7wKI9.png" alt="MLCraft BI Demo"></a>
</div>

------

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

Now visit [http://localhost:3000](http://localhost:3000)

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

## Features

* **Low-code Business Intelligence**: Adopt analytics as fast as possible.
* **Big data in mind**: [Cube.js](https://github.com/cube-js/cube.js/) allows to query trillions of data points.
* **Data schemas**: you don't need to write SQL to query the data every time. Thanks to Cube.js data schema files.
* **Visualizations**: [Vega](https://vega.github.io/vega-lite/) is used to build rich visualizations to analyze the data.
* **Dashboards**: Place visualizations or tables on custom dashboards.
* **Teams**: invite your colleagues and manage their permissions.
* **AutoML (Soon)**: Run machine learning experiments and deploy models in a click from the UI.

## License

MLCraft is licensed under the MIT license. See the [LICENSE](https://github.com/mlcraft-io/mlcraft/blob/main/LICENSE) file for licensing information.

## Authors

[@ifokeev](https://github.com/ifokeev)

[@ilyozzz](https://github.com/ilyozzz)

[@Libertonius](https://github.com/Libertonius)
