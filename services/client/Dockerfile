# build environment
FROM node:14.16.1-slim as build

# define args if you want to build client with built in it process.env vars
ARG GRAPHQL_SERVER_URL
ARG GRAPHQL_WS_URL
ARG GRAPHQL_PLUS_SERVER_URL
ARG CUBEJS_MYSQL_API_URL
ARG CUBEJS_PG_API_URL

ENV GRAPHQL_SERVER_URL $GRAPHQL_SERVER_URL
ENV GRAPHQL_WS_URL $GRAPHQL_WS_URL
ENV GRAPHQL_PLUS_SERVER_URL $GRAPHQL_PLUS_SERVER_URL
ENV CUBEJS_MYSQL_API_URL $CUBEJS_MYSQL_API_URL
ENV CUBEJS_PG_API_URL $CUBEJS_PG_API_URL

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

RUN yarn --network-timeout 100000

RUN echo "building..."
COPY . /app
RUN yarn run build

# production environment
FROM nginx:1.19.0-alpine
COPY --from=build /app/build /usr/share/nginx/html

ARG ENABLE_MINIO_PROXY

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/minio-proxy.conf.template /etc/nginx/templates/minio-proxy.conf.template

RUN if [ -z "$ENABLE_MINIO_PROXY" ] ; then rm /etc/nginx/templates/minio-proxy.conf.template ; fi

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
