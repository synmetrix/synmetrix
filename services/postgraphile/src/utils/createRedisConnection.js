import Redis from 'ioredis';

const redisUrl = process.env.REDIS_ADDR || 'redis://redis:6379';

const newClient = () => new Redis(redisUrl, {
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  } 
});

const connect = async (name = 'default') => new Promise((resolve, reject) => {
  const connectionName = redisUrl;
  const client = newClient();

  client.on('connect', () => {
    console.log(`Redis has connected for: ${name} / ${connectionName}`);
    resolve(client);
  });

  client.on('ready', () => {
    console.log(`Redis is ready for: ${name} / ${connectionName}`);
  });

  client.on('close', () => {
    console.log(`Redis has closed for: ${name} / ${connectionName}`);
  });

  client.on('reconnecting', () => {
    console.log(`Redis is reconnecting for: ${name} / ${connectionName}`);
  });

  client.on('end', () => {
    console.log(`Redis has ended for: ${name} / ${connectionName}`);
    reject();
  });

  client.on('error', (err) => {
    console.error(err);
    reject(err);
  });

  return client;
});

export { connect, redisUrl, newClient };
