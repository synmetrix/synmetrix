FROM node:lts-bookworm-slim

ARG DATABRICKS_JDBC_URL=https://databricks-bi-artifacts.s3.us-east-2.amazonaws.com/simbaspark-drivers/jdbc/2.6.32/DatabricksJDBC42-2.6.32.1054.zip
ARG HASURA_VERSION=v2.36.0
ARG CLIENT_VERSION=v1.5.0
ARG BRANCH=feature/mlcraft-to-synmetrix

RUN yarn global add pm2@5.3.0 wait-on@7.2.0

RUN apt-get update -y \
  && apt-get install -y wget gnupg curl git unixodbc-dev nginx gettext-base apt-transport-https ca-certificates gnupg unzip lsb-release \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && wget -q -O - https://apt.corretto.aws/corretto.key | apt-key add - \
  && echo "deb https://apt.corretto.aws stable main" | tee /etc/apt/sources.list.d/corretto.list \
  && echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
  && (curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/pgdg.gpg) \
  && apt-get update -y \
  && apt-get install -y postgresql-client-15 chromium fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 java-1.8.0-amazon-corretto-jdk \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# hasura engine binary WORKS ONLY WITH AMD64 ARCHITECTURE
RUN curl -o graphql-engine https://graphql-engine-cdn.hasura.io/server/latest/linux-amd64 \
    && mv graphql-engine /usr/local/bin/ \
    && chmod +x /usr/local/bin/graphql-engine

# hasura CLI
RUN export VERSION=${HASURA_VERSION} \
    && curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# hasura backend plus
RUN git clone --depth 1 https://github.com/nhost/hasura-backend-plus /app/hasura-backend-plus

# mlcraft
RUN git clone --recurse-submodules --depth 1 --branch $BRANCH https://github.com/mlcraft-io/mlcraft /app/mlcraft && \
    cd /app/mlcraft && \
    git pull origin $BRANCH && \
    git submodule update --init --recursive

RUN curl https://github.com/mlcraft-io/client-v2/releases/download/$CLIENT_VERSION/dist.tar.gz -L | tar -xz -C /app/mlcraft/services/ && mv /app/mlcraft/services/dist /app/mlcraft/services/client-v2

COPY . /app/

RUN wget -q -O /tmp/DatabricksJDBC.zip "${DATABRICKS_JDBC_URL}" \
    && unzip /tmp/DatabricksJDBC.zip -d /app/mlcraft/services/cubejs/ \
    && rm /tmp/DatabricksJDBC.zip

CMD [ "pm2-runtime", "ecosystem.config.js" ]