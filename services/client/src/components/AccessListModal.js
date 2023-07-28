import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { set } from 'unchanged';

import { useTranslation } from 'react-i18next';
import { useSetState } from 'ahooks';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { Row, Col, Button, Input, Checkbox, message, Empty } from 'antd';

import pickKeys from 'utils/pickKeys';

import ModalView from 'components/ModalView';
import DatasourceCard from 'components/DatasourceCard';
import AccessPart, { calcMembersCount } from 'components/AccessPart';
import Loader from 'components/Loader';

import useSources from 'hooks/useSources';
import useAccessLists from 'hooks/useAccessLists';
import useCheckResponse from 'hooks/useCheckResponse';
import useCurrentTeamState from 'hooks/useCurrentTeamState';

const defaultState = {
  accessList: null,
  selectedSourceId: null,
  selectedModel: null,
  meta: {},
};

const AccessListsModal = ({ editId, onClose, ...props }) => {
  const { t } = useTranslation();
  const { currentTeamState: currentTeam } = useCurrentTeamState();
  const [state, updateState] = useSetState(defaultState);

  const {
    all,
    queries: {
      allData,
    }
  } = useSources({
    pauseQueryAll: false,
    params: {
      editId: state?.selectedSourceId,
    },
  });

  const {
    current,
    queries: {
      currentData,
    },
    mutations: {
      createMutation, execCreateMutation,
      updateMutation, execUpdateMutation,
    }
  } = useAccessLists({
    pauseQueryAll: true,
    params: {
      editId,
      teamId: currentTeam.id,
    },
  });

  useCheckResponse(createMutation, () => {}, { successMessage: 'Created.' });

  useCheckResponse(updateMutation, (res) => {
    if (!res.update_access_lists_by_pk) {
      message.error('No permissions');
    } else {
      message.success('Saved.');
    }
  }, { successMessage: null });

  const onSourceClick = useCallback((id) => {
    updateState({ selectedSourceId: id });
  }, [updateState]);

  const onCancel = () => {
    updateState(defaultState);
    onClose();
  };

  const onSaveList = (accessList) => {
    const newAccessList = {
      name: accessList?.name,
      access_list: {
        datasources: accessList?.datasources,
      },
      team_id: currentTeam.id,
    };

    if (editId) {
      execUpdateMutation({
        pk_columns: {
          id: editId,
        },
        _set: newAccessList,
      });
    } else {
      execCreateMutation({
        object: newAccessList,
      });
    }

    onCancel();
  };

  useEffect(() => {
    if (current) {
      updateState({
        accessList: {
          name: current?.name,
          ...current?.access_list,
        }
      });
    }
  }, [current, currentTeam.id, updateState]);

  useEffect(() => {
    if (!state.selectedSourceId && all.length) {
      updateState({ selectedSourceId: all[0].id });
    }
  }, [all, state.selectedSourceId, updateState]);

  const cubes = useMemo(() => (state.meta?.[state?.selectedSourceId] || {}), [state.meta, state.selectedSourceId]);

  useEffect(() => {
    if ((!state.selectedModel && Object.keys(cubes).length) || (state.selectedModel && !cubes?.[state.selectedModel])) {
      updateState({ selectedModel: Object.keys(cubes)[0] });
    }
  }, [cubes, state.selectedModel, updateState]);

  const onLoadMeta = useCallback((datasourceId, meta) => {
    updateState((prev) => ({ meta: { ...prev.meta, [datasourceId]: meta } }));
  }, [updateState]);

  const onSelectAll = useCallback((checked) => {
    let updatedSettings;
    if (checked) {
      updatedSettings = Object.entries(cubes?.[state.selectedModel]).reduce((acc, [name, arr]) => ({
        ...acc,
        [name]: arr.map(c => c.name),
      }), {});
    }

    const updatedAccessList = set(`datasources.${state.selectedSourceId}.cubes.${state.selectedModel}`, updatedSettings, state.accessList);
    updateState({ accessList: updatedAccessList });
  }, [cubes, state.accessList, state.selectedModel, state.selectedSourceId, updateState]);

  const cards = useMemo(() => {
    const chunks = all.reduce((acc, value, index) => {
      const chunkIndex = Math.floor(index / 3);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }

      acc[chunkIndex].push(value);

      return acc;
    }, []);

    return chunks.map((chunk) => (
      <div style={{ display: 'flex', gap: 10 }} key={chunk?.[0]?.id}>
        {chunk.map((source) => (
          <div key={source.id}>
            <DatasourceCard
              datasource={source}
              accessList={state.accessList}
              isSelected={source.id === state.selectedSourceId}
              onClick={() => onSourceClick(source?.id)}
              onLoadMeta={(id, m) => onLoadMeta(id, m)}
            />
          </div>
        ))}
      </div>
    ));
  }, [all, onLoadMeta, onSourceClick, state.accessList, state.selectedSourceId]);

  const currentMembers = useMemo(() => state?.accessList?.datasources?.[state?.selectedSourceId]?.cubes || {}, [state.accessList, state.selectedSourceId]);
  const isAllSelected = useMemo(() => {
    const currentSelectedCount = calcMembersCount(currentMembers?.[state?.selectedModel]);
    const totalMembersCount = calcMembersCount(state.meta?.[state.selectedSourceId]?.[state.selectedModel]);

    return totalMembersCount && currentSelectedCount === totalMembersCount;
  }, [currentMembers, state.meta, state.selectedModel, state.selectedSourceId]);

  const modalFooter = (
    <Row type="flex">
      <Col span={12} style={{ textAlign: 'left' }}>
        <Button onClick={() => onSaveList(state.accessList)}>
          {t('Save')}
        </Button>
      </Col>
    </Row>
  );

  return (
    <ModalView
      {...pickKeys(['title', 'visible', 'breadcrumbs'], props)}
      onCancel={onCancel}
      footer={modalFooter}
      loading={allData.fetching || currentData.fetching}
      content={(
        <div>
          <div>
            <b>1. {t('Role name')}</b>
            <Input
              type="text"
              value={state?.accessList?.name} 
              placeholder={t('Team Manager')}
              onChange={(e) => updateState({ accessList: { ...state?.accessList, name: e?.target?.value } })}
            />
          </div>
          <div>
            <b>2. {t('Set access to data source resources')}</b>
            <Carousel showArrows stopOnHover showIndicators={false}>
              {cards}
            </Carousel>
          </div>
          {Object.values(cubes).length ? (
            <Row>
              <Col xs={12}>
                <div style={{ padding: '16px', marginBottom: 10, borderRadius: 8, backgroundColor: '#F9F9F9' }}>
                  <b>{t('Data models')}</b>
                  {Object.keys(cubes).map(name => (
                    <div key={name} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', margin: '8px 0', padding: '10px 12px', fontSize: 12, borderRadius: 8, backgroundColor: state.selectedModel === name ? '#F0F1F3' : '#FFF' }} onClick={() => updateState({ selectedModel: name })}>
                      <b>{name}</b>
                      <div>
                        <AccessPart
                          datasourceMeta={state.meta?.[state?.selectedSourceId]}
                          datasourcePermissions={state.accessList?.datasources?.[state.selectedSourceId]?.cubes}
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
                    {Object.entries(cubes?.[state?.selectedModel] || []).map(([name, columns]) => (
                      <div key={name} style={{ marginTop: 15 }}>
                        <b>{(name || '').toUpperCase()}</b>
                        {(columns || []).map(column => {
                          const curSettings = currentMembers?.[state?.selectedModel]?.[name] || [];
                          const colIndex = curSettings.findIndex(col => col === column.name);

                          return (
                            <div key={column.name} style={{ fontWeight: 600, color: '#000' }}>
                              <Checkbox
                                style={{ marginRight: 10 }}
                                checked={colIndex !== -1}
                                onChange={() => {
                                  if (colIndex !== -1) {
                                    curSettings.splice(colIndex, 1);
                                  } else {
                                    curSettings.push(column.name);
                                  }

                                  const updatedAccessList = set(`datasources.${state.selectedSourceId}.cubes.${state.selectedModel}.${name}`, curSettings, state.accessList);
                                  updateState({ accessList: updatedAccessList });
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
          ) : (
            <Loader spinning={currentData.fetching}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data." />
            </Loader>
          )}
        </div>
      )}
    />
  );
};

AccessListsModal.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func,
};

AccessListsModal.defaultProps = {
  editId: null,
  onClose: () => {},
};

export default AccessListsModal;
