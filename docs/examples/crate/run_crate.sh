#!/bin/sh

docker-compose up -d

while [ "$(docker inspect -f '{{.State.Running}}' crate_crate_1)" != "true" ]; do
  sleep 1
done

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  host_ip=$(ip addr | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | cut -d/ -f1 | head -n 1)
elif [[ "$OSTYPE" == "darwin"* ]]; then
  host_ip=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}')
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
  echo "for /f \"tokens=1-2 delims=:\" %%a in ('ipconfig ^| find \"IPv4\"') do echo %%b" > get_host_ip.bat
  host_ip=$(cmd.exe /c get_host_ip.bat)
  rm get_host_ip.bat
else
  echo "Unknown OS. Unable to obtain the host IP address."
  exit 1
fi

sleep 15

curl -X POST -H 'Content-Type: application/json' -d '{"stmt":"CREATE TABLE test_table (id INTEGER PRIMARY KEY, name STRING, age INTEGER);"}' http://$host_ip:4200/_sql
curl -X POST -H 'Content-Type: application/json' -d '{"stmt":"INSERT INTO test_table (id, name, age) VALUES (1, '\''Alice'\'', 30), (2, '\''Bob'\'', 28), (3, '\''Charlie'\'', 22);"}' http://$host_ip:4200/_sql

echo "Host IP address: $host_ip"
