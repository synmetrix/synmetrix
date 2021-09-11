import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Button, Icon, Select, Input, Divider } from 'antd';

import { useSetState } from 'ahooks';
import PopoverButton from 'components/PopoverButton';

import useCurrentUserState from 'hooks/useCurrentUserState';
import useCurrentTeamState from 'hooks/useCurrentTeamState';
import useDashboards from 'hooks/useDashboards';
import usePinnedItems from 'hooks/usePinnedItems';
import useCheckResponse from 'hooks/useCheckResponse';

const { Option } = Select;

const SavePinnedItemButton = ({ spec, specConfig, type, explorationRowId, disabled }) => {
  const { t } = useTranslation();
  const { currentUserState: currentUser } = useCurrentUserState();
  const { currentTeamState } = useCurrentTeamState();

  const lastUsedDashboardId = null;
  const [state, updateState] = useSetState({
    chartName: '',
    selectOpen: false,
    selectedDashboard: lastUsedDashboardId,
    newDashboardName: 'Dashboard',
  });

  const {
    mutations: {
      createMutation: createDashboardMutation,
      execCreateMutation: execCreateDashboardMutation
    }
  } = useDashboards({
    pauseQueryAll: true,
  });

  const {
    mutations: {
      createMutation: createPinnedItemMutation,
      execCreateMutation: execCreatePinnedItemMutation
    }
  } = usePinnedItems();

  const onSelect = useCallback((value) => {
    updateState({ selectedDashboard: value, selectOpen: false });
  }, [updateState]);

  const onChangeInput = (e) => {
    updateState({ newDashboardName: e.target.value });
  };

  const onAddDashboard = () => {
    if (!createDashboardMutation.fetching && state.newDashboardName) {
      execCreateDashboardMutation({
        object: {
          name: state.newDashboardName,
          team_id: currentTeamState.id,
        }
      });
    }
  };

  const onClickSave = () => {
    let newSpecConfig = {};
    if (specConfig) {
      newSpecConfig = specConfig;
    }

    if (spec && explorationRowId) {
      execCreatePinnedItemMutation({
        object: {
          dashboard_id: state.selectedDashboard,
          name: state.chartName,
          exploration_id: explorationRowId,
          spec: {
            ...spec,
            type,
            data: { name: 'values' },
          },
          spec_config: newSpecConfig,
        }
      });
    }
  };

  useCheckResponse(createPinnedItemMutation, () => {}, {
    successMessage: t('Chart saved'),
  });

  useCheckResponse(createDashboardMutation, (res) => {
    const newDashboardId = res?.insert_dashboards_one?.id;
    onSelect(newDashboardId);
  }, {
    successMessage: t('Dashboard saved'),
  });

  const saveDisabled = !state.selectedDashboard || !state.chartName || createPinnedItemMutation.fetching || !Object.keys(spec).length;
  const selectValue = useMemo(() => {
    const actualDashboard = currentUser.dashboards?.find(d => d.id === state.selectedDashboard);

    if (actualDashboard) {
      return [`${actualDashboard.id}`];
    }
    return null;
  }, [currentUser.dashboards, state.selectedDashboard]);

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
              loading={createDashboardMutation.fetching}
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
                      disabled={createPinnedItemMutation.fetching}
                      maxLength={20}
                      addonAfter={(
                        <Icon
                          onClick={onAddDashboard}
                          type={createPinnedItemMutation.fetching ? 'loading' : 'plus'}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            >
              {currentUser.dashboards?.map((item) => <Option key={item.id}>{item.name}</Option>)}
            </Select>
          </div>
          <div style={{ marginTop: 10 }}>
            {t('Chart name')}: <br />
            <Input value={state.chartName} onChange={(e) => updateState({ chartName: e.target.value })} />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button
              type="primary"
              loading={createPinnedItemMutation.fetching}
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
  explorationRowId: PropTypes.string,
  disabled: PropTypes.bool
};

SavePinnedItemButton.defaultProps = {
  specConfig: null,
  explorationRowId: 0,
  disabled: false
};

export default SavePinnedItemButton;
