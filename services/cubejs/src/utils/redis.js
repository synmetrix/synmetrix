import Redis from 'ioredis';

const { REDIS_ADDR } = process.env;

let redisClient = null;

if (REDIS_ADDR) {
  redisClient = new Redis(REDIS_ADDR);

  redisClient.on('error', (error) => {
    if (error?.code === 'ECONNREFUSED' || error?.code === 'EAI_AGAIN') return;
    console.error(error);
  })
}

export default redisClient;
