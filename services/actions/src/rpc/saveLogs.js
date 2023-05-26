import { fetchGraphQL } from '../utils/graphql';
import apiError from '../utils/apiError';
import redisClient from "../utils/redis";
import createMd5Hex from '../utils/md5Hex';

const createEventLogsMutation = `
  mutation ($requests: [request_logs_insert_input!]!, $events: [event_logs_insert_input!]!){
    insert_request_logs(objects: $requests, on_conflict: {
      constraint: request_logs_request_id_key,
      update_columns: [end_time]
    }) {
      affected_rows
    }
    
    insert_event_logs(objects: $events, on_conflict: {
      constraint: event_logs_request_id_event_key,
      update_columns: []
    }) {
      affected_rows
    }
  }
`;

const streamName = 'streams:cubejs-logs-stream';

export default async () => {
  let streamData;

  try {
    streamData = await redisClient.xread('STREAMS', streamName, 0);
  } catch (e) {
    console.log(e);
  }

  let data = streamData?.[0]?.[1];
  if (!data?.length) {
    return 'No logs, skipped.';
  }

  let lastId = data.pop()?.[0];
  lastId = parseInt(lastId) + 1;

  await redisClient.xtrim(streamName, 'MINID', lastId);

  try {
    data = data.map(([_, val]) => JSON.parse(val?.[1])).filter(d => d?.requestId);
  } catch (e) {
    return apiError('Parse data error!');
  }

  const input = data.reduce((acc, event) => {
    let { requests, events } = acc;
    const curRequestId = event.requestId;    
    const timestamp = new Date(event.timestamp);

    if (!requests?.[curRequestId]) {
      requests[curRequestId] = {
        request_id: curRequestId,
        start_time: event.time,
        end_time: event.time,
      }
    }

    if (event?.userId && event?.dataSourceId) {
      requests[curRequestId] = {
        ...requests[curRequestId],
        user_id: event.userId,
        datasource_id: event.dataSourceId,
      }
    }

    let startTime = new Date(requests[curRequestId].start_time);
    if (timestamp < startTime) {
      requests[curRequestId].start_time = timestamp;
    }

    let endTime = new Date(requests[curRequestId].end_time);
    if (timestamp > endTime) {
      requests[curRequestId].end_time = timestamp;
    }

    let query;
    let querySql;
    if (event?.query) {
      if (typeof (event.query) === 'object') {
        query = JSON.stringify(event.query);
      }
    }

    if (event.sqlQuery) {
      querySql = event.sqlQuery?.sql?.[0];
    }

    const queryKey = event?.queryKey ? JSON.stringify(event?.queryKey) : null;
    const queryKeyMd5 = queryKey ? createMd5Hex(queryKey) : null;

    events.push({
      request_id: curRequestId,
      event: event?.event,
      duration: event?.duration,
      query,
      query_key: queryKey,
      query_sql: querySql,
      query_key_md5: queryKeyMd5,
      queue_prefix: event?.queuePrefix,
      time_in_queue: event?.timeInQueue,
      path: event?.path, 
      timestamp,
    });

    return {
      requests,
      events,
    };
  }, {
    requests: {},
    events: [],
  });

  input.requests = Object.values(input.requests);

  try {
    const res = await fetchGraphQL(createEventLogsMutation, { ...input });
    return res;
  } catch (e) {
    return apiError(e);
  }
};
