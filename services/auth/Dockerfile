# builder
FROM node:18.14.1 as builder
WORKDIR /app


COPY tsconfig.json package.json yarn.lock ./
COPY ./src ./src

RUN yarn install
RUN yarn build

# main
FROM node:18.14.1

ENV ENVIRONMENT=production

WORKDIR /app


COPY package*.json yarn.lock ./

RUN  yarn install --production

COPY --from=builder /app/build ./

CMD ["yarn", "start"]
