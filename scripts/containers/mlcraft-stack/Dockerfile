FROM node:16.10-bullseye

RUN yarn global add pm2

RUN apt-get update -y && apt-get install -y curl git nginx unixodbc-dev

WORKDIR /app

# hasura engine
RUN curl -o graphql-engine https://graphql-engine-cdn.hasura.io/server/latest/linux-amd64
RUN chmod +x ./graphql-engine
# hasura CLI
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# mlcraft
RUN git clone https://github.com/mlcraft-io/mlcraft /app/mlcraft

# hasura backend plus
RUN git clone https://github.com/nhost/hasura-backend-plus /app/hasura-backend-plus

COPY . /app/

CMD [ "pm2-runtime", "ecosystem.config.js" ]
