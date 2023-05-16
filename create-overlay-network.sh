docker network rm mlcraft_default
docker network create --driver=overlay --attachable mlcraft_default
