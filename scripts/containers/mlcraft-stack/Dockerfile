FROM node:16.10.0-bullseye

RUN yarn global add pm2 wait-on

RUN apt-get update -y \
  && apt-get install -y wget gnupg curl git unixodbc-dev nginx gettext-base \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update -y \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# hasura engine
RUN curl -o graphql-engine https://graphql-engine-cdn.hasura.io/server/latest/linux-amd64
RUN chmod +x ./graphql-engine
# hasura CLI
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# hasura backend plus
RUN git clone https://github.com/nhost/hasura-backend-plus /app/hasura-backend-plus

# mlcraft
RUN git clone https://github.com/mlcraft-io/mlcraft /app/mlcraft

COPY . /app/

CMD [ "pm2-runtime", "ecosystem.config.js" ]
