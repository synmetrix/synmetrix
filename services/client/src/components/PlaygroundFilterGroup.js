import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, Select } from 'antd';

import trackEvent from 'utils/trackEvent';

import FilterInput from 'components/PlaygroundFilterInput';
import PlaygroundFilterSelect from './PlaygroundFilterSelect';

const FilterGroup = ({ members, availableMembers, addMemberName, updateMethods }) => {
  const { t } = useTranslation();

  return (
    <span>
      {members.map(m => (
        <div style={{ marginBottom: 12, display: 'flex' }} key={m.index}>
          <Button
            shape="circle"
            type="danger"
            icon="close"
            size="small"
            style={{
              marginRight: 8
            }}
            onClick={() => {
              trackEvent('Remove Member', { memberName: addMemberName });
              updateMethods.remove(m);
            }}
          />
          <PlaygroundFilterSelect
            availableMembers={availableMembers}
            value={t(m.dimension.title)}
            onChange={dimension => {
              trackEvent('Update Member', { memberName: addMemberName });
              updateMethods.update(m, { ...m, dimension });
            }}
          />
          <Select
            value={t(m.operator)}
            onChange={operator => updateMethods.update(m, { ...m, operator })}
            style={{ width: 200, marginRight: 8 }}
          >
            {m.operators.map(operator => (
              <Select.Option key={operator.name} value={operator.name}>
                {t(operator.title)}
              </Select.Option>
            ))}
          </Select>
          <FilterInput member={m} key="filterInput" updateMethods={updateMethods} addMemberName={addMemberName} />
        </div>
      ))}
    </span>
  );
};

FilterGroup.propTypes = {
  members: PropTypes.array.isRequired,
  availableMembers: PropTypes.array.isRequired,
  addMemberName: PropTypes.string.isRequired,
  updateMethods: PropTypes.object.isRequired,
};

export default FilterGroup;
