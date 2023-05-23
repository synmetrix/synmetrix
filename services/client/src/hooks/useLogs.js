import { useEffect, useMemo } from 'react';
import { set } from 'unchanged';

import useQuery from './useQuery';

const defaultFields = `
  id
  created_at
  updated_at
  request_id
  user {
    display_name
  }
  datasource {
    name
  }
  event_logs(order_by: {timestamp: asc}) {
    id
    duration
    event
    path
    query
    query_key
    query_sql
    query_key_md5
    queue_prefix
    time_in_queue
    timestamp
  }
`;

const currentLogQuery = `
  query ($id: uuid!) {
    request_logs_by_pk (id: $id) {
      ${defaultFields}
    }
  }
`;

const allLogsQuery = `
  query ($offset: Int, $limit: Int, $where: request_logs_bool_exp) {
    request_logs (offset: $offset, limit: $limit, where: $where) {
      ${defaultFields}
      event_logs_aggregate {
        aggregate {
          count
        }
      }
    }
    request_logs_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const getListVariables = (pagination, params) => {
  let res = {};

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  if (params?.from) {
    res = set('where.created_at._gte', params.from.toISOString(), res);
  }

  if (params?.to) {
    res = set('where.created_at._lte', params.to.toISOString(), res);
  }
  
  return res;
};

const role = 'user';
export default ({ rowId, pagination = {}, params = {} }) => {
  const [allLogsData, execQueryAll] = useQuery({
    query: allLogsQuery,
    variables: getListVariables(pagination, params),
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [currentData, execQueryCurrent] = useQuery({
    query: currentLogQuery,
    variables: { id: rowId },
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const allLogs = useMemo(() => allLogsData.data?.request_logs || [], [allLogsData.data]);
  const totalCount = useMemo(() => allLogsData.data?.request_logs_aggregate?.aggregate?.count || 0, [allLogsData.data]);
  const current = useMemo(() => currentData.data?.request_logs_by_pk, [currentData]);

  useEffect(() => {
    if (!allLogsData.data) {
      execQueryAll();
    }
  }, [allLogsData.data, params.from, params.to, execQueryAll]);

  useEffect(() => {
    if (params?.from && params?.to) {
      execQueryAll();
    }
  }, [params.from, params.to, execQueryAll]);

  useEffect(() => {
    if (rowId) {
      execQueryCurrent();
    } 
  }, [rowId, execQueryCurrent]);

  return {
    allLogs,
    current,
    totalCount,
    queries: {
      allLogsData,
      execQueryAll,
      currentData,
      execQueryCurrent,
    },
  };
};
