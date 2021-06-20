FROM node:12.11.0-stretch

WORKDIR /tmp
COPY ./package.json ./yarn.lock /tmp/

ENV NODE_PATH=/tmp/node_modules
ENV PATH /tmp/node_modules/.bin:$PATH
RUN yarn --network-timeout 100000

WORKDIR /app
COPY . /app/
CMD ["yarn", "start.dev"]
