import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import equals from 'utils/equals';
import { useTrackedEffect } from 'ahooks';
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
import useCurrentTeamState from 'hooks/useCurrentTeamState';
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
  const { currentTeamState: currentTeam } = useCurrentTeamState();
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();

  const basePath = withAuthPrefix('/schemas');
  const [isConsoleOpen, toggleConsole] = useState(false);
  const [error, setError] = useState(null);

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
      updateMutation,
      execUpdateMutation,
      deleteMutation,
      execDeleteMutation,
      exportMutation,
      execExportMutation,
    },
  } = useSchemas({
    params: {
      dataSourceId,
    },
    pauseQueryAll: false,
  });

  const {
    queries: {
      tablesData,
      execQueryTables,
    },
    mutations: {
      runQueryMutation,
      execRunQueryMutation,
      validateMutation,
      execValidateMutation,
      genSchemaMutation,
      execGenSchemaMutation,
    },
  } = useSources({
    params: {
      editId: dataSourceId,
    },
    pauseQueryAll: true,
    disableSubscription: true,
  });

  const genSchemaModalVisible = slug === 'genschema';

  useEffect(() => {
    if (genSchemaModalVisible && dataSourceId) {
      execQueryTables();
    }
  }, [dataSourceId, execQueryTables, genSchemaModalVisible]);

  useCheckResponse(tablesData, (res, err) => {
    if (res) {
      setError(null);
    } else if (err) {
      setError(err);
    }
  }, {
    successMessage: null
  });

  useCheckResponse(exportMutation, (res) => {
    if (res) {
      const url = res?.export_data_models?.download_url;
      window.location.assign(url);
    }
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

  useTrackedEffect((changes, previousDeps, currentDeps) => {
    const prevData = previousDeps?.[0];
    const currData = currentDeps?.[0];

    let dataDiff = false;
    if (!prevData || !currData) {
      dataDiff = false;
    } else {
      dataDiff = !equals(prevData, currData);
    }

    if (dataDiff) {
      execQueryAll({ requestPolicy: 'network-only' });
    }
  }, [currentUser.dataschemas, execQueryAll]);

  useCheckResponse(createMutation, () => {}, {
    successMessage: t('Schema created')
  });

  useCheckResponse(genSchemaMutation, (res) => {
    if (res) {
      execQueryAll();
    }
  }, {
    successMessage: t('Schema generated')
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
    () => runQueryMutation.data?.run_query?.result || [],
    [runQueryMutation.data]
  );

  const [tablesSchema, setTablesSchema] = useState({});
  const sourceTablesSchema = tablesData.data?.fetch_tables?.schema;

  useEffect(() => {
    if (Object.keys(sourceTablesSchema || {}).length) {
      setTablesSchema(sourceTablesSchema);
    }
  }, [sourceTablesSchema]);

  const exportData = () => {
    execExportMutation({
      team_id: currentTeam?.id,
      // branch,
    });
  };

  const routes = [
    {
      path: `${basePath}/${dataSourceId}/genschema`,
      title: t('Generate Schema'),
    },
    {
      path: `${basePath}/${dataSourceId}`,
      title: t('Export data models'),
      onClick: () => exportData(),
    },
  ];

  const onGenSubmit = async (values) => {
    const tables = Object.keys(values).filter(v => values[v]).map(v => ({
      name: v,
    }));

    await execGenSchemaMutation({
      datasource_id: dataSourceId,
      tables,
      overwrite: true,
    });

    onModalClose();
  };

  const { fallback } = usePermissions({ scope: 'dataschemas' });
  if (fallback) {
    return fallback;
  }

  const fetching = allData.fetching || deleteMutation.fetching || createMutation.fetching 
    || validateMutation.fetching || genSchemaMutation.fetching || tablesData.fetching || exportMutation.fetching;

  if (error) {
    return <ErrorFound status={404} />;
  }

  if (!all.length && !dataSourceId) {
    return <ErrorFound status={404} />;
  }

  const onClickCreate = async values => {
    const data = {
      ...values,
      code: '',
      datasource_id: dataSourceId,
    };

    await execCreateMutation({ object: data });
    execQueryAll({ requestPolicy: 'cache-and-network' });
  };

  const onClickUpdate = (editId, values) => {
    execUpdateMutation({
      pk_columns: { id: editId },
      _set: values,
    });
  };

  const onClickDelete = async id => {
    await execDeleteMutation({ id });
    execQueryAll({ requestPolicy: 'cache-and-network' });
  };

  const onCodeSave = (id, code) => {
    onClickUpdate(id, { code });
    execValidateMutation({ id: dataSourceId });
  };

  const onRunSQL = (query, limit) => {
    execRunQueryMutation({
      datasource_id: dataSourceId,
      query,
      limit,
    });
  };

  return [
    <ModalView
      key="genschemaModal"
      title={t('Generate Data Schema Files')}
      visible={genSchemaModalVisible}
      onCancel={onModalClose}
      loading={fetching}
      content={(
        <GenDataSchemasForm
          schemas={tablesSchema}
          onSubmit={onGenSubmit}
        />
      )}
      footer={null}
    />,
    <Loader key="content" spinning={fetching}>
      <div className={s.root}>
        <div className={s.sidebar}>
          <Loader spinning={updateMutation.fetching}>
            <IdeSchemasList
              schemas={all}
              onItemClick={openSchema}
              onCreate={onClickCreate}
              onEdit={onClickUpdate}
              onDelete={onClickDelete}
              moreMenu={routes}
            />
          </Loader>
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
