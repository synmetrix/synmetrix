cd mlcraft/services/client && \
yarn install --silent  --network-timeout 100000 && yarn run --silent build && \
cd /app/mlcraft/services/client/build && \
npx serve -s
