const Redis = require('ioredis');

const redisUrl = process.env.REDIS_ADDR || 'redis://redis:6379';
const redisClient = new Redis(redisUrl);

module.exports = { redisClient };
