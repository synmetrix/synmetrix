import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useUpdateEffect } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import { getOr } from 'unchanged';

import withSizes from 'react-sizes';
import compose from 'utils/compose';

import useSources from 'hooks/useSources';
import useSchemas from 'hooks/useSchemas';
import useSchemasIde from 'hooks/useSchemasIde';
import usePermissions from 'hooks/usePermissions';
import useLocation from 'hooks/useLocation';
import useCheckResponse from 'hooks/useCheckResponse';
import useCurrentUserState from 'hooks/useCurrentUserState';
import useAppSettings from 'hooks/useAppSettings';

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

const DataSchemas = ({ editorWidth, editorHeight, match, ...restProps }) => {
  const { t } = useTranslation();
  const { currentUserState: currentUser } = useCurrentUserState();
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();

  const basePath = withAuthPrefix('/schemas');
  const [isConsoleOpen, toggleConsole] = useState(false);

  const { params = {} } = match;

  const [dataSourceId, slug] = useMemo(() => getOr('', 'rest', params).split('/'),
    [params]
  );

  const onModalClose = () => setLocation(`${basePath}/${dataSourceId}`);
  const dataSchemaName = reservedSlugs.indexOf(slug) === -1 && slug || null;

  const {
    getTabId,
    editTab,
    activeTab,
    changeActiveTab,
    openTab,
    openedTabs,
    openSchema,
  } = useSchemasIde({ dataSourceId });

  const {
    all,
    queries: {
      allData,
      execQueryAll,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      execUpdateMutation,
      deleteMutation,
      execDeleteMutation,
    },
  } = useSchemas({
    params: {
      dataSourceId,
    },
    pauseQueryAll: false,
  });

  const {
    mutations: {
      runQueryMutation,
      execRunQueryMutation,
      validateMutation,
      execValidateMutation,
    },
  } = useSources({
    pauseQueryAll: true,
    disableSubscription: true,
  });

  const schemaIdToCode = useMemo(() => all.reduce((acc, curr) => {
    acc[curr.id] = { name: curr.name, code: curr.code };
    return acc;
  }, {}),
  [all]
  );

  const openedSchemas = useMemo(() => Object.keys(openedTabs)
      .map(id => all.find(schema => schema.id === id))
      .filter(Boolean),
  [all, openedTabs]
  );

  useEffect(() => {
    if (dataSchemaName) {
      const schemaObj = all.find(schema => schema.name === dataSchemaName);

      if (schemaObj && !Object.keys(openedTabs).includes(schemaObj.id)) {
        openTab(schemaObj);
      }
    }
  }, [all, dataSchemaName, openTab, openedTabs]);


  const userSchemasCount = currentUser.dataschemas?.length || 0; 
  const schemasCount = all?.length || 0; 

  useUpdateEffect(() => {
    if (schemasCount && userSchemasCount && userSchemasCount !== schemasCount) {
      execQueryAll({ requestPolicy: 'cache-and-network' });
    }
  }, [currentUser.dataschemas, execQueryAll, schemasCount, userSchemasCount]);

  useCheckResponse(createMutation, () => {}, {
    successMessage: t('Schema created')
  });

  const validationError = useMemo(
    () => validateMutation?.error?.message,
    [validateMutation.error]
  );

  useEffect(
    () => {
      toggleConsole(!!validationError);
    },
    [validationError]
  );

  const sqlResult = useMemo(
    () => runQueryMutation.data?.run_datasource_query_by_pk?.result || [],
    [runQueryMutation.data]
  );

  const routes = [
    {
      path: `${basePath}/${dataSourceId}/genschema`,
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

  const { fallback } = usePermissions({ scope: 'dataschemas' });
  if (fallback) {
    return fallback;
  }

  const loading = false;
  const fetching = allData.fetching || deleteMutation.fetching || createMutation.fetching;

  if (!loading && !all.length && !dataSourceId) {
    return <ErrorFound status={404} />;
  }

  // const fetching = loading || schemaMutations.genMutation.fetching || sourceQueries.tablesData.fetching ||
  //   schemaMutations.delMutation.fetching;

  const tableSchemas = {};

  const onClickCreate = values => {
    const data = {
      ...values,
      code: '',
      datasource_id: dataSourceId,
    };

    execCreateMutation({ object: data });
  };

  const onClickUpdate = (editId, values) => {
    execUpdateMutation({
      pk_columns: { id: editId },
      _set: values,
    });
  };

  const onClickDelete = id => {
    execDeleteMutation({ id });
  };

  const onCodeSave = (id, code) => {
    onClickUpdate(id, { code });
    execValidateMutation({ id: dataSourceId });
  };

  const onRunSQL = (query, limit) => {
    execRunQueryMutation({
      id: dataSourceId,
      query,
      limit,
    });
  };

  return [
    <ModalView
      key="genschemaModal"
      title={t('Generate Data Schema Files')}
      visible={slug === 'genschema'}
      onCancel={onModalClose}
      loading={fetching}
      content={(
        <GenDataSchemasForm
          schemas={tableSchemas}
          onSubmit={onGenSubmit}
        />
      )}
      footer={null}
    />,
    <Loader key="content" spinning={fetching}>
      <div className={s.root}>
        <div className={s.sidebar}>
          <IdeSchemasList
            schemas={all}
            onItemClick={openSchema}
            onCreate={onClickCreate}
            onEdit={onClickUpdate}
            onDelete={onClickDelete}
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
                onRun={onRunSQL}
                error={runQueryMutation?.error}
                loading={runQueryMutation?.fetching}
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
  match: PropTypes.object,
};

DataSchemas.defaultProps = {
  match: {},
};

const mapSizesToProps = ({ width, height }) => ({
  editorWidth: width - 300, // sidebar
  editorHeight: height - 80 - 45 - 45, // header + tabs + tabbar
});

const enhance = compose(
  withSizes(mapSizesToProps),
);

export default enhance(DataSchemas);
