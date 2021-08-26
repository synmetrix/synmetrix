const Cabin = require('cabin');
const signale = require('signale');

const { Signale } = signale;

const loggerOptions = {
  types: {
    queueAdded: {
      badge: '**',
      color: 'yellow',
      label: 'Queue/Added',
      logLevel: 'info'
    },
    queueMutexCreated: {
      badge: '**',
      color: 'green',
      label: 'Queue/Mutex/Created',
      logLevel: 'info'
    },
    queueMutexExists: {
      badge: '**',
      color: 'yellow',
      label: 'Queue/Mutex/Exists',
      logLevel: 'info'
    },
    queueMutexRemoved: {
      badge: '**',
      color: 'green',
      label: 'Queue/Mutex/Removed',
      logLevel: 'info'
    },
  }
};

const pino = require('pino')({
  customLevels: {
    log: 30
  },
  hooks: {
    // <https://github.com/pinojs/pino/blob/master/docs/api.md#logmethod>
    logMethod (inputArgs, method) {
      return method.call(this, {
        // <https://github.com/pinojs/pino/issues/854>
        // message: inputArgs[0],
        msg: inputArgs[0],
        meta: inputArgs[1]
      });
    }
  }
});

const env = process.env.NODE_ENV || 'development';

const logger = new Cabin({
  axe: {
    logger: env === 'production' ? pino : (new Signale(loggerOptions)),
    appInfo: false,
  }
});

module.exports = logger;
