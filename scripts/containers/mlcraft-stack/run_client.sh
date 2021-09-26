cd mlcraft/services/client && \
yarn install --network-timeout 100000 && yarn run build && \
cd /app/mlcraft/services/client/build && \
npx serve -s
