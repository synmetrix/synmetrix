echo "Swarm Worker joining...";
mkdir -p /tmp/swarm/

BUCKET_PATH=s3://$S3_BUCKET/$WORKER_TOKEN_OBJECT

if which aws >/dev/null; then
  echo "Running sync..."

  timeout 10m bash -c "until aws s3 cp $BUCKET_PATH $WORKER_TOKEN_PATH; do echo Retrying...;sleep 10; done"

  if ! test -e $WORKER_TOKEN_PATH; then
    echo "[FAILURE] Copying from $BUCKET_PATH is failed"
    exit
  fi
else
    echo "[Warning]: aws undefined"
    echo "Nothing to sync so"
    exit
fi

echo "Bucket object location: $BUCKET_PATH"
echo "Token location: $WORKER_TOKEN_PATH"

sleep 10
SWARM_JOIN_CMD="docker swarm join --token $(cat $WORKER_TOKEN_PATH) $MASTER_HOST_IP:2377"
echo "Joining..."
echo $SWARM_JOIN_CMD

eval $SWARM_JOIN_CMD
