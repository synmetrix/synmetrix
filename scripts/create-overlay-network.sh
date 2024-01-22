docker network rm synmetrix_default
docker network create --driver=overlay --attachable synmetrix_default
