FROM node:16.8.0-stretch

RUN yarn global add pm2

RUN apt-get update -y && apt-get install -y git nginx

WORKDIR /app
RUN git clone https://github.com/mlcraft-io/mlcraft /app/mlcraft

COPY . /app/

CMD [ "pm2-runtime", "ecosystem.config.js" ]
