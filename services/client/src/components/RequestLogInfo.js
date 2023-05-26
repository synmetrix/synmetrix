import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Row, Col, Input, Divider, Typography } from 'antd';

import { useTranslation } from 'react-i18next';

import PrismCode from 'components/PrismCode';
import Loader from 'components/Loader';
import EventLogsTable from 'components/EventLogsTable';

const { TextArea } = Input;
const { Paragraph } = Typography;

const RequestLogInfo = ({ request, loading }) => {
  const { t } = useTranslation();

  const events = useMemo(() => request?.event_logs || [], [request]);
  const querySql = useMemo(() => events?.find(e => e?.query_sql)?.query_sql, [events]);
  const queryKey = useMemo(() => request.event_logs?.find(e => e.query_key)?.query_key, [request]);
  const queryKeyMd5 = useMemo(() => request.event_logs?.find(e => e.query_key_md5)?.query_key_md5, [request]);

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
      <b>{t('Request ID')}:</b> {request?.request_id}<br />
      <b>{t('Duration')}:</b> {request?.duration}<br />
      <b>{t('Start time')}:</b> {moment(request?.start_time).format('DD.MM.YY, hh:mm:ss.SSS')}<br />
      <b>{t('End time')}:</b> {moment(request?.end_time).format('DD.MM.YY, hh:mm:ss.SSS')}<br />
      {queryKey && (
        <Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'show' }}>
          <b>{t('Query key')}:</b> {queryKey}
        </Paragraph>
      )}
      {queryKeyMd5 && (
        <div>
          <b>{t('Query Key md5')}:</b> {queryKeyMd5}
        </div>
      )}
      <Divider />
      {query && querySql && (
        <Row>
          <Col xs={24} md={24}>
            {t('SQL')}
            <PrismCode
              lang="sql"
              code={querySql || ''}
            />
          </Col>
          <Col xs={24} md={24}>
            {t('Query')}
            <TextArea
              disabled
              rows={20}
              value={query}
              style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: 'white' }}
            />
          </Col>
        </Row>
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
