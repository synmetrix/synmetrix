import { get, getOr } from 'unchanged';
import useLocation from 'wouter/use-location';

import formatDistanceToNow from 'utils/formatDistanceToNow';
import safeJsonParse from 'utils/safeJsonParse';

export const getDataDefinition = record => safeJsonParse('dataDefinition', record);

const useDeploymentDescription = (deployment) => {
  const [, setLocation] = useLocation();

  const jobError = deployment.jobByJobId && deployment.jobByJobId.error;

  const error = [jobError, deployment.error].join('\n');

  const taskSlug = get('taskByTaskId.name', deployment);
  const taskId = get('taskByTaskId.rowId', deployment);

  const openTask = () => {
    setLocation(`/d/experiments/${taskId}`);
  };

  const createdAt = formatDistanceToNow(deployment.createdAt);
  const updatedAt = formatDistanceToNow(deployment.updatedAt);

  const dataDefinition = getDataDefinition(deployment);
  const jobStatus = getOr('INITIALIZED', 'jobByJobId.status', deployment);
  const jobRunning = jobStatus === 'RUNNING';

  return {
    taskSlug,
    openTask,
    jobStatus,
    jobRunning,
    dataDefinition,
    createdAt,
    updatedAt,
    error,
  };
};

export default useDeploymentDescription;
