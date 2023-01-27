FROM hasura/graphql-engine:v2.17.0.cli-migrations-v3

RUN apt-get update -y && apt-get install -y curl socat
RUN hasura-cli update-cli --version v2.17.0

ADD start.sh .

CMD ./start.sh
