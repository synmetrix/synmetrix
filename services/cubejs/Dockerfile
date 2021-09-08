FROM node:16.8.0-stretch

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

RUN yarn --network-timeout 100000

WORKDIR /app
COPY . /app/
CMD ["yarn", "start.dev"]
