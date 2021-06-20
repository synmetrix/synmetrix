echo "Swarm Cluster initializing...";

docker swarm init --advertise-addr `hostname -i`

mkdir -p /tmp/swarm/
docker swarm join-token --quiet worker > $WORKER_TOKEN_PATH
echo "Swarm join-token saved to: $WORKER_TOKEN_PATH"

if which aws >/dev/null; then
  BUCKET_PATH=s3://$S3_BUCKET/$WORKER_TOKEN_OBJECT

  echo "Running sync..."
  echo "Saving to $BUCKET_PATH"

  aws s3 rm $BUCKET_PATH
  if ! aws s3 cp $WORKER_TOKEN_PATH $BUCKET_PATH; then
    echo "[FAILURE] Uploading to $BUCKET_PATH is failed"
    exit
  fi
else
    echo "[Warning]: aws undefined"
    echo "Nothing to sync so"
    exit
fi
