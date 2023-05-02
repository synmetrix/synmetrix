#!/bin/sh

docker-compose up -d

while [ "$(docker inspect -f '{{.State.Running}}' questdb_questdb_1)" != "true" ]; do
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

# import sample data
curl -F "data=@sample_data.csv" "http://$host_ip:9005/imp?overwrite=true&name=sample"

echo "Host IP address: $host_ip"
