import Redis from 'ioredis';

const { REDIS_ADDR } = process.env;

const redisClient = new Redis(REDIS_ADDR);

export default redisClient;
