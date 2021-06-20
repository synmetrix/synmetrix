import path from 'path';
import Graceful from '@ladjs/graceful';

import Bree from 'bree';
import logger from './src/utils/logger';

const bree = new Bree({
  root: path.resolve('src/jobs'),
  logger,

  jobs: [
    'DataSourceRefreshQueue',
  ]
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();

// start all jobs (this is the equivalent of reloading a crontab):
bree.start();
