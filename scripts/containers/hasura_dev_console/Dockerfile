FROM ubuntu:20.04

RUN apt-get update -y && apt-get install -y curl socat

RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
RUN hasura update-cli --version v2.0.5

WORKDIR /hasura

COPY . .

RUN chmod +x ./start.sh

CMD "./start.sh"