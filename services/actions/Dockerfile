FROM node:18.9.0-slim

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt
COPY ./package.json ./yarn.lock /opt/

ENV NODE_PATH=/opt/node_modules
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn --network-timeout 100000

WORKDIR /app
COPY . /app/
RUN ln -s $NODE_PATH ./node_modules

CMD ["yarn", "start.dev"]
