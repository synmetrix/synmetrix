import React, { useMemo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import equals from 'utils/equals';
import { useTrackedEffect, useLocalStorageState } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { Tabs, Divider, message } from 'antd';

import JSZip from 'jszip';
import { load } from 'js-yaml';
import md5 from 'md5';

import { getOr } from 'unchanged';

import withSizes from 'react-sizes';
import compose from 'utils/compose';
import calcChecksum from 'utils/dataschemasChecksum';

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
import VersionsModal from '../components/VersionsModal';
import DocsTab from '../components/DocsTab';

import s from './DataSchemas.module.css';
import SelectBranch from '../components/SelectBranch';

const reservedSlugs = ['sqlrunner', 'genschema', 'docs'];

const getTables = (obj, prefix = '') => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    let result = acc;
    const newPath = prefix ? `${prefix}.${key}` : key;

    if (value === true) {
      const lastSlashIndex = newPath.lastIndexOf('/');
      const formattedPath = `${newPath.slice(0, lastSlashIndex)}.${newPath.slice(lastSlashIndex + 1)}`;
      result.push({ name: formattedPath });
    }

    if (typeof value === 'object') {
      const childResults = getTables(value, newPath);
      result = acc.concat(childResults);
    }

    return result;
  }, []);
};

const DataSchemas = ({ editorWidth, editorHeight, match }) => {
  const { t } = useTranslation();
  // const { currentTeamState: currentTeam } = useCurrentTeamState();
  const { currentUserState } = useCurrentUserState();
  const currentUser = currentUserState?.users_by_pk;

  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();

  const basePath = withAuthPrefix('/schemas');
  const [isConsoleOpen, toggleConsole] = useState(false);
  const [error, setError] = useState(null);
  
  const { params = {} } = match;
  
  const [dataSourceId, slug] = useMemo(() => getOr('', 'rest', params).split('/'),
    [params]
  );

  const [currentBranchId, setCurrentBranchId,] = useLocalStorageState(`${dataSourceId}:currentBranch` , null);

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
      deleteMutation,
      execDeleteMutation,
      exportMutation,
      execExportMutation,
      createBranchMutation,
      execCreateBranchMutation,
      createVersionMutation,
      execCreateVersionMutation,
      setDefaultMutation,
      execSetDefaultMutation,
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
  const versionsModalVisible = slug === 'versions';

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

  const currentBranch = useMemo(() => (all || []).find(branch => branch.id === currentBranchId), [all, currentBranchId]);
  const currentVersion = useMemo(() => currentBranch?.versions?.[0] || [], [currentBranch]);
  const dataschemas = useMemo(() => currentVersion?.dataschemas || [], [currentVersion]);

  const schemaIdToCode = useMemo(() => dataschemas.reduce((acc, curr) => {
    acc[curr.id] = { name: curr.name, code: curr.code };
    return acc;
  }, {}),
  [dataschemas]
  );

  const openedSchemas = useMemo(() => Object.keys(openedTabs)
      .map(id => dataschemas.find(schema => schema.id === id))
      .filter(Boolean),
  [dataschemas, openedTabs]
  );

  useEffect(() => {
    if (dataSchemaName) {
      const schemaObj = dataschemas.find(schema => schema.name === dataSchemaName);

      if (schemaObj && !Object.keys(openedTabs).includes(schemaObj.id)) {
        openTab(schemaObj);
      }
    }
  }, [dataschemas, dataSchemaName, openTab, openedTabs]);

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
  }, [currentUserState.dataschemas, execQueryAll]);

  useCheckResponse(genSchemaMutation, (res) => {
    if (res) {
      execQueryAll();
    }
  }, {
    successMessage: t('Schema generated')
  });

  useCheckResponse(createBranchMutation, (res) => {
    if (res) {
      execQueryAll();
    }
  }, {
    successMessage: t('Branch created')
  });

  useCheckResponse(createVersionMutation, (res) => {
    if (res) {
      execQueryAll();
    }
  }, {
    successMessage: t('Version created')
  });

  useCheckResponse(setDefaultMutation, (res) => {
    if (res) {
      execQueryAll();
    }
  }, {
    successMessage: t(`Branch "${currentBranch?.name}" is now default.`)
  });

  useCheckResponse(deleteMutation, (res) => {
    if (res) {
      execQueryAll();
    }
  }, {
    successMessage: t('Branch removed')
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

  useEffect(() => {
    if (!dataSourceId && currentUserState?.datasources?.length) {
      setLocation(`${basePath}/${currentUserState.datasources[0].id}`);
    }
  }, [dataSourceId, currentUserState, basePath, setLocation]);

  const exportData = () => {
    execExportMutation({
      branch_id: currentBranchId,
    });
  };

  const inputFile = useRef(null);

  const uploadFile = () => {
    inputFile.current.click();
  };

  const ideMenu = [
    {
      path: `${basePath}/${dataSourceId}/genschema`,
      title: t('Generate Schema'),
    },
    {
      path: `${basePath}/${dataSourceId}`,
      title: t('Import data models'),
      onClick: () => uploadFile(),
    },
    {
      path: `${basePath}/${dataSourceId}`,
      title: t('Export data models'),
      onClick: () => exportData(),
    },
  ];

  const branchMenu = [
    {
      path: `${basePath}/${dataSourceId}/versions`,
      title: t('Show versions'),
    },
    all.length > 1 && {
      path: `${basePath}/${dataSourceId}`,
      title: t('Remove branch'),
      onClick: () => execDeleteMutation({ id: currentBranchId }),
    },
  ].filter(Boolean);

  const onGenSubmit = async (format, values) => {
    const tables = getTables(values);

    await execGenSchemaMutation({
      datasource_id: dataSourceId,
      branch_id: currentBranchId,
      tables,
      format,
      overwrite: true,
    });

    onModalClose();
  };

  const { fallback } = usePermissions({ scope: 'dataschemas' });
  if (fallback) {
    return fallback;
  }

  const fetching = allData.fetching || deleteMutation.fetching || setDefaultMutation.fetching
    || validateMutation.fetching || genSchemaMutation.fetching || tablesData.fetching || exportMutation.fetching;

  if (error) {
    return <ErrorFound status={404} />;
  }

  if (!all.length && !dataSourceId) {
    return <ErrorFound status={404} />;
  }

  const createNewVersion = async (checksum, data) => {
    const preparedDataschemas = data.map((schema) => {
      const updatedData = {
        name: schema?.name,
        code: schema?.code || '',
        user_id: schema?.user_id || currentUser?.id,
        datasource_id: schema?.datasource_id || dataSourceId,
      };

      return updatedData;
    });

    const versionData = {
      checksum,
      user_id: currentUser?.id,
      branch_id: currentBranchId,
      dataschemas: {
        data: preparedDataschemas,
      },
    };

    await execCreateVersionMutation({ object: versionData });
  };

  const onClickCreate = async values => {
    const newSchemas = [
      ...dataschemas,
      {
        ...values,
        code: '',
      }
    ];

    const checksum = calcChecksum(newSchemas);
    await createNewVersion(checksum, newSchemas);
  };

  const onUploadFile = async ({ target }) => {
    const file = target.files?.[0];

    if (file?.type !== 'application/zip') {
      message.error('Format is unsupported.');
      return false;
    }

    const zip = new JSZip();
    
    try {
      await zip.loadAsync(file);
    } catch (err) {
      message.error('Bad archive.');
      return false;
    }

    if (!zip?.files?.['meta.yaml']) {
      message.error('Wrong archive.');
      return false;
    }

    const yamlFile = await zip.file('meta.yaml').async('string');
    const zipMeta = load(yamlFile);
    zipMeta.schemas = zipMeta.schemas.reduce((acc, cur) => ({ ...acc, ...cur }), {});

    zip.remove('meta.yaml');

    let newSchemas = await Promise.all(Object.entries(zip.files || []).map(async ([name, rawData]) => {
      const content = await rawData.async('string');
      const checksum = md5(`${name}-${content}`);

      if (zipMeta?.schemas?.[name]?.checksum !== checksum) {
        message.warning(`Checksum of file "${name}" do not match. Skipped.`);
        return false;
      }

      return {
        name,
        code: content,
      };
    }));

    newSchemas = newSchemas.filter(Boolean);
    const schemasChecksum = calcChecksum(newSchemas);

    if (newSchemas.length) {
      await createNewVersion(schemasChecksum, newSchemas);
    }

    return newSchemas;
  };

  const onClickUpdate = async (editId, values) => {
    const newDataschemas = [...dataschemas];
    const editSchemaIndex = newDataschemas.findIndex(schema => schema.id === editId);
    
    newDataschemas[editSchemaIndex] = {
      ...newDataschemas[editSchemaIndex],
      ...values,
    };

    const checksum = calcChecksum(newDataschemas);

    if (currentVersion.checksum === checksum) {
      message.info('There is no changes.');
      return false;
    }

    await createNewVersion(checksum, newDataschemas);

    return newDataschemas;
  };

  const onClickDelete = async id => {
    const newDataschemas = [...dataschemas];
    const deleteSchemaIndex = newDataschemas.findIndex(schema => schema.id === id);
    newDataschemas.splice(deleteSchemaIndex, 1);

    const checksum = calcChecksum(newDataschemas);

    await createNewVersion(checksum, newDataschemas);
  };

  const onCodeSave = (id, code) => {
    onClickUpdate(id, { code });
    execValidateMutation({ id: dataSourceId });
    execQueryAll();
  };

  const onRunSQL = (query, limit) => {
    execRunQueryMutation({
      datasource_id: dataSourceId,
      query,
      limit,
    });
  };

  const onCreateBranch = async (name) => {
    const newSchemas = dataschemas.map(schema => ({
      name: schema.name,
      code: schema.code,
      user_id: currentUser.id,
      datasource_id: dataSourceId,
    }));

    const branchData = {
      name,
      status: 'created',
      user_id: currentUser.id,
      datasource_id: dataSourceId,
      versions: {
        data: {
          user_id: currentUser.id,
          checksum: currentVersion?.checksum || 'No data',
          dataschemas: {
            data: newSchemas,
          }
        }
      }
    };

    await execCreateBranchMutation({ object: branchData });
  };

  const onSetDefault = (branchId = null) => {
    execSetDefaultMutation({
      branch_id: branchId || currentBranchId,
      datasource_id: dataSourceId,
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
    <ModalView
      key="versions"
      title={t('Versions list')}
      visible={versionsModalVisible}
      onCancel={onModalClose}
      loading={fetching}
      content={(
        <VersionsModal 
          versions={currentBranch?.versions}
          onRestore={createNewVersion}
        />
      )}
      footer={null}
    />,
    <Loader key="content" spinning={fetching}>
      <div className={s.root}>
        <div className={s.sidebar}>
          <Loader spinning={false}>
            <>
              <SelectBranch
                branches={all}
                moreMenu={branchMenu}
                currentBranchId={currentBranchId}
                branchStatus={currentBranch?.status}
                dataSourceId={dataSourceId}
                onChange={setCurrentBranchId}
                onCreate={onCreateBranch}
                onSetDefault={onSetDefault}
                curVersion={currentVersion?.checksum}
                loading={fetching}
              />
              <Divider style={{ margin: '0' }} />
              <IdeSchemasList
                schemas={dataschemas}
                onItemClick={openSchema}
                onCreate={onClickCreate}
                onEdit={onClickUpdate}
                onDelete={onClickDelete}
                moreMenu={ideMenu}
              />
              <input
                type='file'
                accept='application/zip'
                ref={inputFile}
                onChange={onUploadFile}
                style={{ display: 'none' }}
              />
            </>
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
                  value={schemaIdToCode?.[getTabId(schema)]?.code}
                  onSave={(value) => onCodeSave(schema.id, value)}
                  width={editorWidth}
                  height={editorHeight}
                />
              </Tabs.TabPane>
            ))}
            <Tabs.TabPane tab="Docs" key="docs" closable={false}>
              <DocsTab toolbar versionId={currentVersion?.id} />
            </Tabs.TabPane>
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
