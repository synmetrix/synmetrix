FROM node:16.10.0-bullseye

ARG DATABRICKS_JDBC_URL=https://databricks-bi-artifacts.s3.us-east-2.amazonaws.com/simbaspark-drivers/jdbc/2.6.32/DatabricksJDBC42-2.6.32.1054.zip

RUN yarn global add pm2 wait-on

RUN apt-get update -y \
  && apt-get install -y wget gnupg curl git unixodbc-dev nginx gettext-base apt-transport-https ca-certificates gnupg unzip \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && wget -q -O - https://apt.corretto.aws/corretto.key | apt-key add - \
  && echo "deb https://apt.corretto.aws stable main" | tee /etc/apt/sources.list.d/corretto.list \
  && apt-get update -y \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 java-1.8.0-amazon-corretto-jdk \
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

RUN wget -q -O /tmp/DatabricksJDBC.zip "${DATABRICKS_JDBC_URL}" \
    && unzip /tmp/DatabricksJDBC.zip -d /app/mlcraft/services/cubejs/ \
    && rm /tmp/DatabricksJDBC.zip

CMD [ "pm2-runtime", "ecosystem.config.js" ]
