import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'antd';

import { useTranslation } from 'react-i18next';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';

import AlertModal from 'components/AlertModal'; // create
import AlertTable from 'components/AlertTable'; // create
import PageInfo from 'components/PageInfo';
import Container from 'components/Container';

import usePermissions from 'hooks/usePermissions';

const DataSources = ({ match }) => {
  const { t } = useTranslation();
  const { params = {} } = match || {};
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/alerts');

  const { fallback } = usePermissions({ scope: 'alerts' });
  if (fallback) {
    return fallback;
  }

  const onModalOpen = record => {
    setLocation(`${basePath}/${record.id || ''}`);
  };

  const onModalClose = () => {
    setLocation(basePath);
  };

  const onNewAlertClick = deliveryType => {
    setLocation(`${basePath}/new/${(deliveryType || '').toLowerCase()}`);
  };

  const showNewForm = location.pathname.includes('/new');

  const breadcrumbs = [
    { path: basePath, title: t('Alerts') },
    { path: `${basePath}/new`, title: t('New') },
    params?.deliveryType && { path: `${basePath}/new/${params?.deliveryType}`, title: params?.deliveryType },
  ].filter(v => !!v);

  return (
    <Container>
      <PageInfo
        title={t('Alerts')}
        description={(
          <>
            <ul>
              <li>{t('List and manage your alerts')}</li>
              <li>{t('Select the metrics to track and get notified when the values go out of bounds')}</li>
            </ul>
            <Button type="primary" size="small" shape="round" onClick={() => onNewAlertClick()}>
              <Icon type="plus" />
              {t('Create')}
            </Button>
          </>
        )}
      />
      <AlertModal
        title={t('New Alert')}
        dataSource={{}}
        initialValues={{
          delivery_type: (params?.deliveryType || '').toUpperCase(),
        }}
        breadcrumbs={breadcrumbs}
        onChange={onNewAlertClick}
        onCancel={onModalClose}
        onSave={onModalOpen}
        visible={showNewForm}
      />
      <AlertTable
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
