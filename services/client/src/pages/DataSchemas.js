import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import useLocation from 'wouter/use-location';
import { Tabs } from 'antd';

import { get, getOr } from 'unchanged';

import withSizes from 'react-sizes';
import compose from 'utils/compose';

import useIde from 'hooks/useIde';
import usePermissions from 'hooks/usePermissions';

import Loader from 'components/Loader';
import ModalView from 'components/ModalView';
import IdeTab from 'components/IdeTab';
import IdeSchemasList from 'components/IdeSchemasList';
import SqlRunner from 'components/SqlRunner';
import GenDataSchemasForm from 'components/GenDataSchemasForm';
import IdeConsole from 'components/IdeConsole';

import ErrorFound from 'components/ErrorFound';
import s from './DataSchemas.module.css';

const reservedSlugs = ['sqlrunner', 'genschema'];

const DataSchemas = ({ editorWidth, editorHeight, params, ...restProps }) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const basePath = '/d/schemas';
  const [isConsoleOpen, toggleConsole] = useState(false);

  const [dataSourceId, slug] = useMemo(() => getOr('', 'rest', params).split('/'),
    [params]
  );

  const onModalClose = () => setLocation(`${basePath}/${dataSourceId}`);

  const dataSchemaName = reservedSlugs.indexOf(slug) === -1 && slug || null;

  // const {
  //   loading,
  //   getTabId,
  //   activeTab,
  //   closeTab,
  //   changeActiveTab,
  //
  //   allSchemas,
  //   schemaIdToCode,
  //   openedSchemas,
  //   openSchema,
  //   schemaMutations,
  //
  //   dataSource,
  //   sourceQueries,
  //   sourceMutations,
  // } = useIde({ dataSourceId, dataSchemaName, slug });

  const validationError = useMemo(
    () => {
      const { validateMutation } = schemaMutations;
      return get('error.message', validateMutation);
    },
    [schemaMutations]
  );

  useEffect(
    () => {
      toggleConsole(!!validationError);
    },
    [validationError]
  );

  const editTab = (id, action) => {
    if (action === 'remove') {
      closeTab(id);
    }
  };

  // const sqlResult = useMemo(
  //   () => getOr([], 'runSQL.data', sourceMutations.runSQLMutation.data),
  //   [sourceMutations.runSQLMutation.data]
  // );

  const routes = [
    {
      path: `/d/schemas/${dataSourceId}/genschema`,
      title: t('Generate Schema'),
    },
  ];

  const onGenSubmit = (values) => {
    const tables = Object.keys(values).filter(v => values[v]).map(v => ({
      name: v,
    }));

    // schemaMutations.mExecGenMutation(tables);
    onModalClose();
  };

  const onCodeSave = (id, code) => {
    // schemaMutations.mExecEditMutation(id, { code });
  };

  const { fallback } = usePermissions({ scope: 'dataschemas' });
  if (fallback) {
    return fallback;
  }

  const loading = false;
  const fetching = false;

  if (!loading && !allSchemas.length && !dataSource.id) {
    return <ErrorFound status={404} />;
  }

  // const fetching = loading || schemaMutations.genMutation.fetching || sourceQueries.tablesData.fetching ||
  //   schemaMutations.delMutation.fetching;

  return [
    <ModalView
      key="genschemaModal"
      title={t('Generate Data Schema Files')}
      visible={slug === 'genschema'}
      onCancel={onModalClose}
      loading={fetching}
      content={(
        <GenDataSchemasForm
          schemas={(sourceQueries.tablesData.data || {}).allDatasourceTables}
          onSubmit={onGenSubmit}
        />
      )}
      footer={null}
    />,
    <Loader key="content" spinning={fetching}>
      <div className={s.root}>
        <div className={s.sidebar}>
          <IdeSchemasList
            schemas={allSchemas}
            onItemClick={openSchema}
            onCreate={schemaMutations.mExecNewMutation}
            onEdit={schemaMutations.mExecEditMutation}
            onDelete={schemaMutations.mExecDelMutation}
            moreMenu={routes}
          />
        </div>
        <div className={s.content}>
          <Tabs
            activeKey={activeTab}
            onChange={changeActiveTab}
            onEdit={editTab}
            animated={false}
            type="editable-card"
            hideAdd
          >
            {openedSchemas.map(schema => (
              <Tabs.TabPane key={getTabId(schema)} tab={schema.name}>
                <IdeTab
                  value={schemaIdToCode[getTabId(schema)].code}
                  onSave={(value) => onCodeSave(schema.id, value)}
                  width={editorWidth}
                  height={editorHeight}
                />
              </Tabs.TabPane>
            ))}
            <Tabs.TabPane tab="SQL Runner" key="sqlrunner" closable={false}>
              <SqlRunner
                data={sqlResult}
                width={editorWidth}
                height={editorHeight}
                onRun={(query, limit) => sourceMutations.mExecRunSQLMutation(dataSource.rowId, query, limit)}
                error={sourceMutations.runSQLMutation.error}
                loading={sourceMutations.runSQLMutation.fetching}
              />
            </Tabs.TabPane>
          </Tabs>
          {isConsoleOpen && activeTab !== 'sqlrunner' && (
            <IdeConsole
              onClose={() => toggleConsole(false)}
              errors={validationError}
            />
          )}
        </div>
      </div>
    </Loader>
  ];
};

DataSchemas.propTypes = {
  editorWidth: PropTypes.number.isRequired,
  editorHeight: PropTypes.number.isRequired,
  params: PropTypes.object,
};

DataSchemas.defaultProps = {
  params: {},
};

const mapSizesToProps = ({ width, height }) => ({
  editorWidth: width - 300, // sidebar
  editorHeight: height - 80 - 45 - 45, // header + tabs + tabbar
});

const enhance = compose(
  withSizes(mapSizesToProps),
);

export default enhance(DataSchemas);
