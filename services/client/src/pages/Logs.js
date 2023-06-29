import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Tabs } from 'antd';

import { useTranslation } from 'react-i18next';

import PageInfo from 'components/PageInfo';
import Container from 'components/Container';
import LogsTab from 'components/LogsTab';
import PreAggregationsTab from 'components/PreAggregationsTab';

import useAppSettings from 'hooks/useAppSettings';
import useLocation from 'hooks/useLocation';

const { TabPane } = Tabs;

const Logs = ({ match }) => {
  const { t } = useTranslation();
  const { withAuthPrefix } = useAppSettings();
  const [location, setLocation] = useLocation();
  const basePath = withAuthPrefix('/logs');
  const { params = {} } = match || {};
  const section = useMemo(() => location.pathname.match(/logs\/(\w+)/)?.[1] || null, [location.pathname]);

  useEffect(() => {
    if (!section) {
      setLocation(`${basePath}/requests`);
    }
  }, [section, basePath, setLocation]);

  return (
    <Container>
      <PageInfo
        title={t('Logs')}
        description={
          <ul>
            <li>List cubejs logs and pre-aggregations</li>
          </ul>
        }
      />
      <Tabs defaultActiveKey="requests" activeKey={section} onChange={(key) => setLocation(`${basePath}/${key}`)}>
        <TabPane tab="Requests" key="requests">
          <LogsTab params={params} />
        </TabPane>
        <TabPane tab="Pre-Aggregations" key="preaggregations">
          <PreAggregationsTab params={params} />
        </TabPane>
      </Tabs>
    </Container>
  );
};

Logs.propTypes = {
  match: PropTypes.object.isRequired,
};

Logs.defaultProps = {};

export default Logs;
