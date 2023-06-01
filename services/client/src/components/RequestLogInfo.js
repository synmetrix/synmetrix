import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Input, Divider, Alert } from 'antd';

import { useTranslation } from 'react-i18next';

import PrismCode from 'components/PrismCode';
import Loader from 'components/Loader';
import EventLogsTable from 'components/EventLogsTable';
import formatTime from 'utils/formatTime';

const { TextArea } = Input;

const RequestLogInfo = ({ request, loading }) => {
  const { t } = useTranslation();

  const { events, querySql, queryKey, queryKeyMd5, error } = useMemo(() => {
    let eventLogs = request?.request_event_logs || [];
    eventLogs = eventLogs.map((e, i) => {
      let duration = e?.duration;

      if (!duration) {
        const curTimestamp = eventLogs?.[i]?.timestamp;
        const prevTimestamp = eventLogs?.[i + 1]?.timestamp || curTimestamp;

        duration = new Date(curTimestamp) - new Date(prevTimestamp);
      }

      return {
        ...e,
        duration,
      };
    });

    let key = request.request_event_logs?.find(e => e.query_key)?.query_key;

    if (key) {
      try {
        key = JSON.parse(key);
      } catch (err) {
        console.error(err);
      }
    }

    return {
      events: eventLogs,
      error: eventLogs?.find(e => e?.error)?.error,
      querySql: eventLogs?.find(e => e?.query_sql)?.query_sql,
      queryKey: key,
      queryKeyMd5: request.request_event_logs?.find(e => e.query_key_md5)?.query_key_md5,
    };
  }, [request.request_event_logs]);

  const query = useMemo(() => {
    const rawQuery = events?.find(e => e?.query)?.query;

    try {
      return JSON.stringify(JSON.parse(rawQuery), undefined, 2);
    } catch (e) {
      return null;
    }
  }, [events]);

  return (
    <Loader spinning={loading}>
      {error && (
        <Alert message={error} type="error" />
      )}
      <b>{t('Request ID')}:</b> {request?.request_id}
      <br />
      <b>{t('Path')}:</b> {request?.path}
      <br />
      <b>{t('Duration')}:</b> {request?.duration}
      <br />
      <b>{t('Start time')}:</b> {formatTime(request?.start_time)}
      <br />
      <b>{t('End time')}:</b> {formatTime(request?.end_time)}
      <br />
      {queryKeyMd5 && (
        <div>
          <b>{t('Query Key md5')}:</b> {queryKeyMd5}
        </div>
      )}
      {queryKey && (
        <>
          <b>{t('Query Key')}:</b>
          <TextArea
            disabled
            rows={5}
            value={queryKey}
            style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: 'white' }}
          />
        </>
      )}
      <Divider />
      {query && querySql && (
        <>
          <div>
            <b>{t('SQL')}:</b>
            <PrismCode lang="sql" code={querySql || ''} />
          </div>
          <div>
            <b>{t('Query')}:</b>
            <TextArea
              disabled
              rows={20}
              value={query}
              style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: 'white' }}
            />
          </div>
        </>
      )}
      <EventLogsTable events={events} />
    </Loader>
  );
};

RequestLogInfo.propTypes = {
  request: PropTypes.object,
  loading: PropTypes.bool,
};

RequestLogInfo.defaultProps = {
  request: {},
  loading: false,
};

export default RequestLogInfo;
