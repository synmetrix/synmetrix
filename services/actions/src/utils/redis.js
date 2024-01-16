import Redis from "ioredis";

const { REDIS_ADDR } = process.env;

let redisClient = null;

if (REDIS_ADDR) {
  redisClient = new Redis(REDIS_ADDR);
}

export default redisClient;
