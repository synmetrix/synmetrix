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

### Step 3: Try out MLCraft

MLCraft itself will be available on `http://localhost/`

GraphQL endpoint will be `http://localhost/v1/graphql`

Admin Console (Hasura Console) will be available on `http://localhost/console`

NOTE: check out `HASURA_GRAPHQL_ADMIN_SECRET` in the `docker-compose` file. You'll need it to enter the Admin Console.

---

If you want to schedule a 20-min call with our team to help you get set up, please select [some time directly here](https://calendly.com/mlcraft-io/video-meeting).
