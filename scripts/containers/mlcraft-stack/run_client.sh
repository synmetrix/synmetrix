cd mlcraft/services/client && \
yarn install --network-timeout 100000 && yarn run build && \
envsubst < /app/nginx/default.conf.template > /etc/nginx/sites-enabled/default.conf && \
cd /app/mlcraft/services/client/build && \
npx serve -s
