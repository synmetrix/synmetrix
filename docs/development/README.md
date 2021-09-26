## Local development 

Prerequisites
-------------

- Docker
- Docker-compose
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
