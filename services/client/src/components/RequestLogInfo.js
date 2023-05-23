import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Input, Divider } from 'antd';

import { useTranslation } from 'react-i18next';

import PrismCode from 'components/PrismCode';
import Container from 'components/Container';
import Loader from 'components/Loader';
import EventLogsTable from 'components/EventLogsTable';

const { TextArea } = Input;

const RequestLogInfo = ({ request, loading }) => {
  const { t } = useTranslation();

  const events = useMemo(() => request?.event_logs || [], [request]);
  const queryKey = useMemo(() => request.event_logs?.reverse()?.find(e => e.query_key)?.query_key, [request]);
  const queryKeyMd5 = useMemo(() => request.event_logs?.find(e => e.query_key_md5)?.query_key_md5, [request]);

  const querySql = useMemo(() => {
    const sql = events?.find(e => e?.query_sql)?.query_sql;
    return sql;
  }, [events]);

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
      <Container>
        <div>
          <b>{t('Request ID')}:</b> {request?.request_id}
        </div>
        {queryKey && (
          <div>
            <b>{t('Query key')}:</b> {queryKey}
          </div>
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
      </Container>
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
