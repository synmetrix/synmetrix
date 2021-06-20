import unchanged from 'unchanged';
import { parentPort, workerData } from 'worker_threads';
import AbstractJobQueue from './AbstractJobQueue';
import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';

const { get } = unchanged;

const refreshCubesCache = async (dataSource) => {
  const { rowId, userId } = dataSource;

  logger.success(`Refreshing cache for DataSource "${rowId}"...`);

  const cubejs = cubejsApi({
    dataSourceId: rowId,
    userId,
  });

  const res = await cubejs.runScheduledRefresh();
  return res;
};

export const QUEUE_NAME = 'datasource_refresh';
export const jobQueue = new AbstractJobQueue(QUEUE_NAME, {
  lockMessageKey: 'rowId',
  lockDelay: 5000,
  unlockDelay: 1000,
  onReceive: job => {
    if (job.data && job.data.rowId) {
      return refreshCubesCache(job.data);
    }
  }
});

const WATCH_QUERY = `
  SELECT 
    id as "rowId",
    user_id as "userId"
  FROM
    mlworkflow.datasources
`;

const runJobs = async () => {
  await jobQueue.listen('5m', async () => {
    await jobQueue.popMessages();
    await jobQueue.watchQuery(WATCH_QUERY);
  });

  jobQueue.quit();
  process.exit(0);
};

try {
  if (get('job.name', workerData) === 'DataSourceRefreshQueue') {
    jobQueue.init().then(() => runJobs());
  }
} catch (err) {
  logger.error(err);
  process.exit(1);
}
