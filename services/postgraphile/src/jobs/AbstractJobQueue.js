import RedisSMQ from 'rsmq';
import IORedis from 'ioredis';
import { parentPort } from 'worker_threads';
import ms from 'ms';
import EventEmitter from 'events';

import { redisUrl } from '../utils/createRedisConnection';
import { pool } from '../utils/pgApi';
import logger from '../utils/logger';
import delay from '../utils/delay';
import { hashCode } from '../utils/nameHelpers';
import { checkMutex, removeMutex } from '../utils/mutex';

const PREFIX = 'rsmq';
// create new connection for every rsmq need
const redisSimpleQueue = client => {
  return new RedisSMQ({ url: redisUrl, ns: PREFIX });
};

const DEBUG = process.env.DEBUG === '1';

class PopMessageError extends Error {}

const noop = queueName => {
  logger.warning(`[${queueName}]: onReceive not implemented`);
};
  
const createRedisClient = () => {
  return new IORedis(redisUrl);
};

export default class AbstractJobQueue {
  constructor(queueName, config = {}) {
    this.queueName = queueName;
    this.events = new EventEmitter();

    this.isCancelled = false;
    this.offlineQueue = [];

    this.lockMessageKey = config.lockMessageKey;
    this.invisibletime = config.invisibletime || 600;
    this.lockDelay = config.lockDelay || 60000;
    this.unlockDelay = config.unlockDelay || 30000;
    this.customExceedCheck = config.customExceedCheck || undefined;
    this.maxReceiveCount = config.maxReceiveCount || 10;
    this.popMessageDelay = config.popMessageDelay || 100;

    this.onReceive = (config.onReceive && config.onReceive.bind(this)) || (() => noop(queueName));
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const rsmq = redisSimpleQueue();

      rsmq.on('connect', () => {
        logger.info(`[${this.queueName}] Redis connected`);
        resolve(rsmq);
      });

      rsmq.on('error', () => {
        logger.error(`[${this.queueName}] RSMQ error`);
        reject();
      });
    });
  }

  async init() {
    this.rsmq = await this.connect();

    this.redisClient = createRedisClient();

    this.rsmq.on('disconnect', async () => {
      this.redisClient = createRedisClient();
      this.rsmq = redisSimpleQueue();
      logger.warning(`[${this.queueName}] Redis reconnected`);

      await delay(3000);
    })

    if (parentPort) {
      parentPort.once('message', message => {
        if (message === 'cancel') {
          this.quit();
        }
      });
    }

    this.createQueue();
    return this.rsmq;
  }

  async processMessage(msg) {
    if (msg.message) {
      let processMessage = true;

      const parsedMessage = JSON.parse(msg.message);
      const messageMutexKey = this.getMessageMutexKey(parsedMessage);
      const mutexKey = this.getMutexKey(messageMutexKey || msg.message);

      DEBUG && logger.info(`[${this.queueName}] Received message with "${mutexKey}" (lock key: ${messageMutexKey || 'auto'})`);

      try {
        await checkMutex(this.redisClient, mutexKey, { ttl: parseFloat(this.lockDelay / 1000) });
        DEBUG && logger.queueMutexCreated(`[${this.queueName}] Mutex key "${mutexKey}" (lock key: ${messageMutexKey || 'auto'})`);
      } catch (err) {
        processMessage = false;
        DEBUG && logger.queueMutexExists(`[${this.queueName}] Mutex key "${mutexKey}" (lock key: ${messageMutexKey || 'auto'})`);
      }

      if (!processMessage) {
        return null;
      }

      try {
        const context = {
          redisClient: this.redisClient,
          pgClient: pool,
        };

        await this.onReceive({ data: parsedMessage }, context);
      } catch (err) {
        logger.error('popMessage onReceive error:');
        logger.error(err);
      }

      setTimeout(async () => {
        await removeMutex(this.redisClient, mutexKey);
        logger.queueMutexRemoved(`[${this.queueName}] Mutex key "${mutexKey}" (lock key: ${messageMutexKey || 'auto'})`);
      }, this.unlockDelay);
    }

    return msg;
  }

  check(msg) { 
    if (this.customExceedCheck && this.customExceedCheck(msg)) {
      return null;
    }
 
    if (msg.rc >= this.maxReceiveCount) {
      this.events.emit('exceeded', msg);
      logger.warning(`Message received more than ${this.maxReceiveCount} times. So delete it.\n${msg}`);
      this.delMessage(msg.id);
      return false;
    }

    return this.processMessage(msg);
  }

  async listen(interval, body) {
    this.events.on('data', this.check.bind(this));

    while (!this.isCancelled) {
      body();

      await delay(ms(interval));
    }
  }

  async processOfflineMessages() {
    if (this.offlineQueue && this.offlineQueue.length) {
      const sentMessages = this.offlineQueue.map(msg => {
        logger.debug(`[${this.queueName}] Processing offline message: `, msg);

        return this.sendMessage(msg);
      });

      return Promise.allSettled(sentMessages);
    }

    return false;
  }

  async watchQuery(query) {
    const { rows } = await pool.query(query);

    if (DEBUG) {
      logger.pending(`There are ${rows.length} rows to process in ${this.queueName}`);

      if (rows.length) {
        console.table(rows);
      }
    }

    rows.forEach(row => {
      this.sendMessage(row);
    });

    return rows;
  }

  createQueue() {
    return this.rsmq.createQueue({ qname: this.queueName, maxsize: -1, vt: this.invisibletime }, (err, resp) => {
      if (err) {
        // if the error is `queueExists` we can keep going as it tells us that the queue is already there
        if (err.name !== 'queueExists') {
          logger.error(err);
          return;
        } else {
          logger.log(`Queue ${this.queueName} exists. Resuming...`);
        }
      }

      if (resp === 1) {
        logger.log(`Queue ${this.queueName} created`);
        return;
      }

      this.processOfflineMessages();
    });
  }

  async popMessage() {
    let msg = {};

    try {
      msg = await this.rsmq.popMessageAsync({ qname: this.queueName });
      logger.debug(`[${this.queueName}] Received Message: `, msg);
    } catch (err) {
      throw new PopMessageError(err.message);
    }

    if (msg.id) {
      this.events.emit('data', msg);
      await delay(this.popMessageDelay);
    }

    return msg;
  }

  async popMessages() {
    try {
      const msg = await this.popMessage();

      if (msg.id) {
        return this.popMessages();
      }
    } catch (err) {
      if (err instanceof PopMessageError) {
        logger.debug(`[${this.queueName}] Skipped message. Going next...`);
        logger.error(`[${this.queueName}] popMessage Error:`);
        logger.error(err);

        return this.popMessages();
      }

      logger.error(`[${this.queueName}] popMessage unhandled error:`);
      logger.error(err);
      return null;
    }

    return null;
  }

  async sendMessage(msg) {
    if (this.rsmq.connected) {
      const jsonMessage = JSON.stringify(msg);
      const res = await this.rsmq.sendMessageAsync({ qname: this.queueName, message: jsonMessage });

      return res;
    }

    logger.info(`[${this.queueName}] Store offline message: `, msg);
    this.offlineQueue.push(msg)

    return msg;
  }

  async delMessage(id) {
    const res = await this.rsmq.deleteMessageAsync({ qname: this.queueName, id });
    this.events.emit('deleted', id);
    logger.debug(`[${this.queueName}] Delete Message: `, id);

    return res;
  }

  getMutexKey(str) {
    return PREFIX + `:${this.queueName}:mutex:message:` + hashCode(String(str));
  }

  getMessageMutexKey(message) {
    const res = message && this.lockMessageKey && message[this.lockMessageKey] || null;
    return res;
  }

  quit() {
    this.isCancelled = true;

    // signal to parent that the job is done
    if (parentPort) {
      parentPort.postMessage('done');
    }

    return this.rsmq.quit(() => {
      logger.complete(`[${this.queueName}] Disconnected`);
    });
  }
};
