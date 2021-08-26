FROM node:14.11.0-stretch

WORKDIR /opt
COPY ./package.json ./yarn.lock /opt/

ENV NODE_PATH=/opt/node_modules
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn --network-timeout 100000

WORKDIR /app
COPY . /app/
RUN ln -s $NODE_PATH ./node_modules

CMD ["yarn", "start.dev"]
