import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { set } from 'unchanged';

import { useTranslation } from 'react-i18next';
import { useSetState } from 'ahooks';

import {
  Row, Col, Icon, Button, Input, Checkbox
} from 'antd';

import pickKeys from 'utils/pickKeys';

import useSources from 'hooks/useSources';

import Loader from 'components/Loader';
import ModalView from 'components/ModalView';
import DatasourceCard from 'components/DatasourceCard';
import AccessPart, { calcMembersCount } from 'components/AccessPart';

const defaultState = {
  role: null,
  selectedSourceId: null,
  selectedModel: null,
  meta: {},
};

const RoleModal = ({ role, onSave, ...props }) => {
  const { t } = useTranslation();
  const [state, updateState] = useSetState({
    ...defaultState,
    role,
  });

  const {
    all,
  } = useSources({
    pauseQueryAll: false,
    params: {
      editId: state?.selectedSourceId,
    },
  });
 
  const modalFooter = (
    <Row type="flex">
      <Col span={12} style={{ textAlign: 'left' }}>
        <Button onClick={() => onSave()}>
          {t('Save')}
        </Button>
      </Col>
    </Row>
  );

  const onSourceClick = useCallback((id) => {
    updateState({ selectedSourceId: id });
  }, [updateState]);

  useEffect(() => {
    if (role) {
      updateState({ role });
    }
  }, [role, updateState]);

  useEffect(() => {
    if (!state.selectedSourceId && all.length) {
      updateState({ selectedSourceId: all[0].id });
    }
  }, [all, state.selectedSourceId, updateState]);

  const models = useMemo(() => (state.meta?.[state?.selectedSourceId] || {}), [state.meta, state.selectedSourceId]);

  useEffect(() => {
    if ((!state.selectedModel && Object.keys(models).length) || (state.selectedModel && !models?.[state.selectedModel])) {
      updateState({ selectedModel: Object.keys(models)[0] });
    }
  }, [models, state.selectedModel, updateState]);

  const onLoadMeta = useCallback((datasourceId, meta) => {
    updateState((prev) => ({ meta: { ...prev.meta, [datasourceId]: meta } }));
  }, [updateState]);

  const onSelectAll = useCallback((checked) => {
    let updatedSettings;
    if (checked) {
      updatedSettings = Object.entries(models?.[state.selectedModel]).reduce((acc, [name, arr]) => ({
        ...acc,
        [name]: arr.map(c => c.shortTitle),
      }), {});
    }

    const updatedRole = set(`datasources.${state.selectedSourceId}.models.${state.selectedModel}`, updatedSettings, state.role);
    updateState({ role: updatedRole });
  }, [models, state.role, state.selectedModel, state.selectedSourceId, updateState]);

  const cards = useMemo(() => (
    all.map(source => (
      <DatasourceCard
        datasource={source}
        roleState={state.role}
        isSelected={source.id === state.selectedSourceId}
        onClick={() => onSourceClick(source?.id)}
        onLoadMeta={(id, m) => onLoadMeta(id, m)}
      />
    ))
  ), [all, onLoadMeta, onSourceClick, state.role, state.selectedSourceId]);

  const currentMembers = useMemo(() => state?.role?.datasources?.[state?.selectedSourceId]?.models || {}, [state.role, state.selectedSourceId]);
  const isAllSelected = useMemo(() => {
    const currentSelectedCount = calcMembersCount(currentMembers?.[state?.selectedModel]);
    const totalMembersCount = calcMembersCount(state.meta?.[state.selectedSourceId]?.[state.selectedModel]);

    return currentSelectedCount === totalMembersCount;
  }, [currentMembers, state.meta, state.selectedModel, state.selectedSourceId]);
  
  return (
    <ModalView
      {...pickKeys(['title', 'onCancel', 'visible', 'loading', 'breadcrumbs'], props)}
      footer={modalFooter}
      // loading={checkMutation.fetching}
      content={(
        <div>
          <div>
            <b>1. {t('Role name')}</b>
            <Input 
              type="text" 
              value={state?.role?.name} 
              placeholder={t('Team Manager')}
              onChange={(e) => updateState({ role: { ...state?.role, name: e?.target?.value } })}
            />
          </div>
          <div>
            <b>2. {t('Set access to data source resources')}</b>
            <div>
              {cards}
            </div>
          </div>
          <Row>
            <Col xs={12}>
              <div style={{ padding: '16px', marginBottom: 10, borderRadius: 8, backgroundColor: '#F9F9F9' }}>
                <b>{t('Data models')}</b>
                {Object.keys(models).map(name => (
                  <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', margin: '8px 0', padding: '10px 12px', fontSize: 12, borderRadius: 8, backgroundColor: state.selectedModel === name ? '#F0F1F3' : '#FFF' }} onClick={() => updateState({ selectedModel: name })}>
                    <b>{name}</b>
                    <div>
                      <AccessPart
                        datasourceMeta={state.meta?.[state?.selectedSourceId]}
                        datasourcePermissions={state.role?.datasources?.[state.selectedSourceId]?.models}
                        modelName={name}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={12}>
              <div style={{ padding: '16px', marginBottom: 10, borderRadius: 8, backgroundColor: '#FFF' }}>
                <b>{t('Measures/dimensions/segments')}</b>
                <div style={{ color: '#000' }}>
                  <Checkbox checked={isAllSelected} style={{ marginRight: 10 }} onChange={(e) => onSelectAll(e.target.checked)} />
                  {t('Select all')}
                </div>
                <div>
                  {Object.entries(models?.[state?.selectedModel] || []).map(([name, columns]) => (
                    <div style={{ marginTop: 15 }}>
                      <b>{(name || '').toUpperCase()}</b>
                      {columns.map(column => {
                        const curSettings = currentMembers?.[state?.selectedModel]?.[name] || [];
                        const colIndex = curSettings.findIndex(col => col === column.shortTitle);

                        return (
                          <div style={{ fontWeight: 600, color: '#000' }}>
                            <Checkbox
                              style={{ marginRight: 10 }}
                              checked={colIndex !== -1}
                              onChange={() => {
                                if (colIndex !== -1) {
                                  curSettings.splice(colIndex, 1);
                                } else {
                                  curSettings.push(column.shortTitle);
                                }

                                const updatedRole = set(`datasources.${state.selectedSourceId}.models.${state.selectedModel}.${name}`, curSettings, state.role);
                                updateState({ role: updatedRole });
                              }}
                            />
                            {column.shortTitle}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    />
  );
};

RoleModal.propTypes = {
  role: PropTypes.object,
};

RoleModal.defaultProps = {
  role: {},
};

export default RoleModal;
