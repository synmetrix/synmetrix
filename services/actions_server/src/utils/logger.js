import Cabin from 'cabin';
import signale from 'signale';

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

const logger = new Cabin({
  axe: {
    logger: new Signale(loggerOptions),
    appInfo: false,
    capture: false,
  }
});

export default logger;
