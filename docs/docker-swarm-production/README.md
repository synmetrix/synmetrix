# Docker Swarm deployment guide

## Run containers locally (staging mode)

```
docker swarm init

# if needed
# docker network rm mlcraft_default

./create-overlay-network.sh

./run-registry.sh

# build images and push
REGISTRY_HOST=127.0.0.1:50001 python3 cli.py --env stage services push

# up the stack
DOMAIN=localhost REGISTRY_HOST=127.0.0.1:50001 python3 cli.py --env stage services up mlcraft_bi
```

NOTE: default docker registry url is `index.docker.io`

Then run migrations:

```
./migrate.sh
```

### Destroy stack

```
python3 cli.py --env stage services destroy mlcraft_bi
```

### Show logs

```
python3 cli.py --env stage services logs mlcraft_bi_postgraphile
```

### Show stack tasks status

```
python3 cli.py --env stage services ps mlcraft_bi
```

### Bugs

If you see:

```
failed to create service app_nginx: Error response from daemon: rpc error: code = FailedPrecondition desc = service needs ingress network, but no ingress network is present

```

Just create the ingress network:

```
docker network create --ingress --driver overlay ingress
```
