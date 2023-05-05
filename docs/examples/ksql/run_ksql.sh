#!/bin/sh

docker-compose up -d

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

while :
do
  response=$(curl -s http://localhost:8088/info)
  if [[ $response == *"\"serverStatus\":\"RUNNING\""* ]]; then
    break
  fi
  sleep 1
done

# Create stream
curl -X POST http://localhost:8088/ksql --header "Content-Type: application/vnd.ksql.v1+json; charset=utf-8" --data '{"ksql": "CREATE STREAM test_stream (column1 INT, column2 VARCHAR, column3 DOUBLE, column4 BOOLEAN, column5 BIGINT) WITH (kafka_topic='\''test'\'', KEY_FORMAT='\''KAFKA'\'', PARTITIONS=1, REPLICAS=1, value_format='\''json'\'');"}'

# Insert test data
curl -X POST http://localhost:8088/ksql --header "Content-Type: application/vnd.ksql.v1+json; charset=utf-8" --data '{"ksql": "INSERT INTO test_stream (column1, column2, column3, column4, column5) VALUES (1, '\''test1'\'', 1.1, true, 100);"}'
curl -X POST http://localhost:8088/ksql --header "Content-Type: application/vnd.ksql.v1+json; charset=utf-8" --data '{"ksql": "INSERT INTO test_stream (column1, column2, column3, column4, column5) VALUES (2, '\''test2'\'', 2.2, false, 200);"}'
curl -X POST http://localhost:8088/ksql --header "Content-Type: application/vnd.ksql.v1+json; charset=utf-8" --data '{"ksql": "INSERT INTO test_stream (column1, column2, column3, column4, column5) VALUES (3, '\''test3'\'', 3.3, true, 300);"}'
curl -X POST http://localhost:8088/ksql --header "Content-Type: application/vnd.ksql.v1+json; charset=utf-8" --data '{"ksql": "INSERT INTO test_stream (column1, column2, column3, column4, column5) VALUES (4, '\''test4'\'', 4.4, false, 400);"}'
curl -X POST http://localhost:8088/ksql --header "Content-Type: application/vnd.ksql.v1+json; charset=utf-8" --data '{"ksql": "INSERT INTO test_stream (column1, column2, column3, column4, column5) VALUES (5, '\''test5'\'', 5.5, true, 500);"}'

echo "Host IP address: $host_ip"