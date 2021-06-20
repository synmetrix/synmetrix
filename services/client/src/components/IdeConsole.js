import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Card, Button } from 'antd';

import s from './IdeConsole.module.css';

const IdeConsole = ({ errors, onClose }) => {
  return (
    <Card className={s.card}>
      <Tabs
        activeKey="errors"
        animated={false}
        hideAdd
        tabBarExtraContent={(
          <Button
            style={{ marginRight: 18 }}
            size="small"
            icon="close"
            onClick={onClose}
          />
        )}
      >
        <Tabs.TabPane tab="Errors" key="errors" closable={false}>
          <div className={s.errorText}>
            {errors}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

IdeConsole.propTypes = {
  onClose: PropTypes.func.isRequired,
  errors: PropTypes.string,
};

IdeConsole.defaultProps = {
  errors: ''
};

export default IdeConsole;
