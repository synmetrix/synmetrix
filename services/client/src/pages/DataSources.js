import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'antd';

import { useTranslation } from 'react-i18next';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';

import DataSourceModal from 'components/DataSourceModal';
import SQLInterfaceModal from 'components/SQLInterfaceModal';
import DataSourcesTable from 'components/DataSourcesTable';
import PageInfo from 'components/PageInfo';
import Container from 'components/Container';

import usePermissions from 'hooks/usePermissions';
import genName from '../utils/genName';

import iconDataSources from 'assets/images/icon_data_sources.svg';

const DataSources = ({ match }) => {
  const { t } = useTranslation();
  const { params = {} } = match || {};
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/sources');

  const { fallback } = usePermissions({ scope: 'datasources' });
  if (fallback) {
    return fallback;
  }

  const onModalOpen = record => {
    setLocation(`${basePath}/${record.id || ''}`);
  };

  const onModalClose = () => {
    setLocation(basePath);
  };

  const onConnectNewClick = dbType => {
    setLocation(`${basePath}/new/${(dbType || '').toLowerCase()}`);
  };

  const onSQLInterfaceNewClick = () => {
    setLocation(`${basePath}/sql-interface`);
  };

  const showNewForm = location.pathname.includes('/new');
  const showSQLInterfaceForm = location.pathname.includes('/sql-interface');

  const breadcrumbs = [
    { path: basePath, title: t('Data Sources') },
    showSQLInterfaceForm && { path: `${basePath}/sql-interface`, title: t('New SQL Interface') },
    showNewForm && { path: `${basePath}/new`, title: t('New') },
    params?.dbType && { path: `${basePath}/new/${params?.dbType}`, title: params?.dbType },
  ].filter(v => !!v);

  return (
    <Container>
      <PageInfo
        imgSrc={iconDataSources}
        imgStyle={{ padding: 3 }}
        title={t('Data Sources')}
        description={(
          <>
            <ul>
              <li>{t('List and manage your Datasets')}</li>
              <li>{t('Connect new Data Source and create its Data Schema after')}</li>
            </ul>
            <Button type="primary" size="small" shape="round" onClick={() => onConnectNewClick()}>
              <Icon type="plus" />
              {t('Connect')}
            </Button>
            <Button size="small" shape="round" onClick={() => onSQLInterfaceNewClick()} style={{ marginLeft: 10 }}>
              <Icon type="plus" />
              {t('SQL interface')}
            </Button>
          </>
        )}
      />
      <DataSourceModal
        title={t('New Data Source')}
        dataSource={{}}
        initialValues={{
          db_type: (params?.dbType || '').toUpperCase(),
        }}
        breadcrumbs={breadcrumbs}
        onChange={onConnectNewClick}
        onCancel={onModalClose}
        onSave={onModalOpen}
        visible={showNewForm}
      />
      <SQLInterfaceModal
        title={t('New SQL Interface')}
        breadcrumbs={breadcrumbs}
        onChange={onConnectNewClick}
        onCancel={onModalClose}
        onSave={onModalClose}
        visible={showSQLInterfaceForm}
        initialValues={{
          username: genName(10),
          password: genName(20),
        }}
      />
      <DataSourcesTable
        editId={params?.rowId}
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
