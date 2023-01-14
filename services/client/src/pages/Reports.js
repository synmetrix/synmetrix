import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'antd';

import { useTranslation } from 'react-i18next';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';

import ReportModal from 'components/ReportModal';
import ReportTable from 'components/ReportTable';
import PageInfo from 'components/PageInfo';
import Container from 'components/Container';

import usePermissions from 'hooks/usePermissions';

import iconDataSources from 'assets/images/icon_data_sources.svg';

const DataSources = ({ match }) => {
  const { t } = useTranslation();
  const { params = {} } = match || {};
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/reports');

  const { fallback } = usePermissions({ scope: 'reports' });
  if (fallback) {
    return fallback;
  }

  const onModalOpen = record => {
    setLocation(`${basePath}/${record.id || ''}`);
  };

  const onModalClose = () => {
    setLocation(basePath);
  };

  const onNewReportClick = deliveryType => {
    setLocation(`${basePath}/new/${(deliveryType || '').toLowerCase()}`);
  };

  const showNewForm = location.pathname.includes('/new');

  const breadcrumbs = [
    { path: basePath, title: 'Reports' },
    { path: `${basePath}/new`, title: 'New' },
    params?.deliveryType && { path: `${basePath}/new/${params?.deliveryType}`, title: params?.deliveryType },
  ].filter(v => !!v);

  return (
    <Container>
      <PageInfo
        imgSrc={iconDataSources}
        imgStyle={{ padding: 3 }}
        title={t('Reports')}
        description={(
          <>
            <ul>
              <li>List and manage your reports</li>
              <li>Select the metrics that will be automatically sent to you at the scheduled time</li>
            </ul>
            <Button type="primary" size="small" shape="round" onClick={() => onNewReportClick()}>
              <Icon type="plus" />
              {t('Create')}
            </Button>
          </>
        )}
      />
      <ReportModal
        title={t('New Report')}
        dataSource={{}}
        initialValues={{
          delivery_type: (params?.deliveryType || '').toUpperCase(),
        }}
        breadcrumbs={breadcrumbs}
        onChange={onNewReportClick}
        onCancel={onModalClose}
        onSave={onModalOpen}
        visible={showNewForm}
      />
      <ReportTable
        editId={params?.editId}
        onModalOpen={onModalOpen}
        onModalClose={onModalClose}
      />
    </Container>
  );
};

DataSources.propTypes = {
  match: PropTypes.object.isRequired,
};

DataSources.defaultProps = {};

export default DataSources;
