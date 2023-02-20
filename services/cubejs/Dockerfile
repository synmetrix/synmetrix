FROM node:16.8.0-stretch

RUN DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get install -y --no-install-recommends rxvt-unicode libssl1.1 \
    && rm -rf /var/lib/apt/lists/*

ENV TERM rxvt-unicode
ENV NODE_ENV production

# Required for node-oracledb to buld on ARM64
RUN apt-get update \
    && apt-get install -y python3 gcc g++ make cmake \
    && npm config set python /usr/bin/python2.7 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

RUN yarn --network-timeout 100000


WORKDIR /app
COPY . /app/
CMD ["yarn", "start.dev"]
