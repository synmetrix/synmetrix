# build environment
FROM nginx:1.25.3

ARG ENABLE_MINIO_PROXY
ARG APP_DIR=/app
ARG CLIENT_VERSION=v1.5.0

# define args if you want to build client with built in it process.env vars
ARG HASURA_GRAPHQL_ENDPOINT
ARG HASURA_WS_ENDPOINT
ARG GRAPHQL_PLUS_SERVER_URL
ARG CUBEJS_MYSQL_API_URL
ARG CUBEJS_PG_API_URL
ARG CUBEJS_REST_API_URL
ARG CUBEJS_API_DOCS_URL

# we need to make env variables from args
# to create nginx config after
ENV HASURA_GRAPHQL_ENDPOINT $HASURA_GRAPHQL_ENDPOINT
ENV HASURA_WS_ENDPOINT $HASURA_WS_ENDPOINT
ENV GRAPHQL_PLUS_SERVER_URL $GRAPHQL_PLUS_SERVER_URL
ENV CUBEJS_MYSQL_API_URL $CUBEJS_MYSQL_API_URL
ENV CUBEJS_PG_API_URL $CUBEJS_PG_API_URL
ENV CUBEJS_REST_API_URL $CUBEJS_REST_API_URL
ENV CUBEJS_API_DOCS_URL $CUBEJS_API_DOCS_URL

WORKDIR $APP_DIR
RUN curl https://github.com/mlcraft-io/client-v2/releases/download/$CLIENT_VERSION/dist.tar.gz -L | tar -xz -C $APP_DIR && \
    rm -rf /usr/share/nginx/html && \
    mv $APP_DIR/dist /usr/share/nginx/html

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/minio-proxy.conf.template /etc/nginx/templates/minio-proxy.conf.template
RUN if [ -z "$ENABLE_MINIO_PROXY" ] ; then rm /etc/nginx/templates/minio-proxy.conf.template ; fi

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
