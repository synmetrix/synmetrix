cd mlcraft/services/client && \
yarn install --network-timeout 100000 && yarn run build && \
cp -R /app/mlcraft/services/client/build /usr/share/nginx/html && \
cd /app && \
envsubst < nginx/default.conf.template > /etc/nginx/sites-enabled/default && \
nginx -g "daemon off;"
