ARG HASURA_VERSION=v2.37.0
ARG HASURA_CLI_VERSION=${HASURA_VERSION}.cli-migrations-v3

FROM hasura/graphql-engine:$HASURA_CLI_VERSION

ARG HASURA_VERSION=v2.37.0

RUN apt-get update -y && apt-get install -y curl build-essential
RUN curl http://archive.ubuntu.com/ubuntu/pool/main/s/socat/socat_1.7.4.1.orig.tar.gz -o /tmp/socat_1.7.4.1.orig.tar.gz
RUN tar -xvzf /tmp/socat_1.7.4.1.orig.tar.gz -C /tmp
RUN cd /tmp/socat-1.7.4.1 && ./configure && make && make install

RUN hasura-cli update-cli --version $HASURA_VERSION

ADD start.sh .

CMD ./start.sh