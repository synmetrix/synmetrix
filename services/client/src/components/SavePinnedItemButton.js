import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { get } from 'unchanged';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Select, Input, Divider, message } from 'antd';

import PopoverButton from 'components/PopoverButton';
import useDashboards from 'hooks/useDashboards';
import usePinnedItems from 'hooks/usePinnedItems';
import useAuth from 'hooks/useAuth';
import useXState from 'hooks/useXState';

const { Option } = Select;

const SavePinnedItemButton = ({ spec, specConfig, type, explorationRowId, disabled }) => {
  const { t } = useTranslation();
  const {
    lastUsedDashboardId,
    setLastUsedDashboardId,
  } = useAuth();

  const [state, updateState] = useXState({
    chartName: '',
    selectOpen: false,
    selectedDashboard: lastUsedDashboardId,
    newDashboardName: 'Dashboard',
  });

  const {
    all: dashboards,
    queries: {
      executeQueryAll,
    },
    mutations: {
      createMutation, mExecuteNewMutation,
    }
  } = useDashboards({});

  const {
    mutations: {
      createMutation: newPinnedItem,
      mExecuteNewMutation: newPinnedItemMutation
    }
  } = usePinnedItems({});

  const onSelect = useCallback((value) => {
    setLastUsedDashboardId(value);
    updateState({ selectedDashboard: value, selectOpen: false });
  }, [setLastUsedDashboardId, updateState]);

  const onChangeInput = (e) => {
    updateState({ newDashboardName: e.target.value });
  };

  const onAddDashboard = () => {
    if (!createMutation.fetching && state.newDashboardName) {
      mExecuteNewMutation({ name: state.newDashboardName });
    }
  };

  const onClickSave = () => {
    let newSpecConfig = {};
    if (specConfig) {
      newSpecConfig = specConfig;
    }

    if (spec && explorationRowId) {
      newPinnedItemMutation({
        dashboardId: parseInt(state.selectedDashboard, 10),
        name: state.chartName,
        explorationId: parseInt(explorationRowId, 10),
        spec: {
          ...spec,
          type,
          data: { name: 'values' },
        },
        specConfig: newSpecConfig,
      });
    }
  };

  useEffect(() => {
    if (newPinnedItem.error) {
      message.error(newPinnedItem.error.message);
    } else if (newPinnedItem.data) {
      message.success(t('Chart saved!'));
      newPinnedItem.data = null;
    }
  }, [newPinnedItem.data, executeQueryAll, t, newPinnedItem.error]);

  useEffect(() => {
    if (createMutation.error) {
      message.error(createMutation.error.message);
    } else if (createMutation.data) {
      const newDashboardId = get('data.createDashboard.dashboard.rowId', createMutation);

      onSelect(newDashboardId);
      executeQueryAll();

      createMutation.data = null;
    }
  }, [createMutation, dashboards.length, executeQueryAll, onSelect]);

  const saveDisabled = !state.selectedDashboard || !state.chartName || newPinnedItem.fetching || !Object.keys(spec).length;
  const selectValue = useMemo(() => {
    const actualDashboard = dashboards.find(d => parseInt(d.rowId, 10) === parseInt(state.selectedDashboard, 10));
    if (actualDashboard) {
      return [`${actualDashboard.rowId}`];
    }
    return null;
  }, [dashboards, state.selectedDashboard]);

  return (
    <PopoverButton
      iconType="pushpin"
      style={{ borderColor: 'transparent', boxShadow: 'none', color: 'rgba(0, 0, 0, 0.25)', background: 'transparent' }}
      placement="top"
      trigger="click"
      disabled={disabled}
      content={(
        <>
          {t('Dashboard')}: <br />
          <div onClick={() => updateState({ selectOpen: !state.selectOpen })}>
            <Select
              style={{ width: 240, cursor: 'pointer' }}
              placeholder={t('Select dashboard')}
              open={state.selectOpen}
              loading={createMutation.fetching}
              onSelect={onSelect}
              value={selectValue}
              dropdownRender={menu => (
                <div
                  onMouseLeave={() => updateState({ selectOpen: false })}
                  style={{  marginTop: '-50px', paddingTop: '50px', cursor: 'pointer'  }}
                >
                  {menu}
                  <Divider style={{ margin: '0' }} />
                  <div
                    style={{ padding: '4px 8px' }}
                  >
                    <Input
                      value={state.newDashboardName}
                      onChange={onChangeInput}
                      onClick={e => e.stopPropagation()}
                      disabled={createMutation.fetching}
                      maxLength={20}
                      addonAfter={(
                        <Icon
                          onClick={onAddDashboard}
                          type={createMutation.fetching ? 'loading' : 'plus'}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            >
              {dashboards.map((item) => <Option key={item.rowId}>{item.name}</Option>)}
            </Select>
          </div>
          <div style={{ marginTop: 10 }}>
            {t('Chart name')}: <br />
            <Input value={state.chartName} onChange={(e) => updateState({ chartName: e.target.value })} />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button
              type="primary"
              loading={newPinnedItem.fetching}
              disabled={saveDisabled}
              onClick={onClickSave}
            >
              {t('Save')}
            </Button>
          </div>
        </>
      )}
    />
  );
};


SavePinnedItemButton.propTypes = {
  spec: PropTypes.object.isRequired,
  specConfig: PropTypes.object,
  type: PropTypes.string.isRequired,
  explorationRowId: PropTypes.number,
  disabled: PropTypes.bool
};

SavePinnedItemButton.defaultProps = {
  specConfig: null,
  explorationRowId: 0,
  disabled: false
};

export default SavePinnedItemButton;
