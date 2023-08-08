import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { get, getOr } from 'unchanged';
import { useTranslation } from 'react-i18next';

import { Icon, Button, Row, Form, Tabs, Collapse } from 'antd';
import cx from 'classnames';

import useFormItems from 'hooks/useFormItems';
import useCollapse from 'hooks/useCollapse';

import { extendConfigByFieldValues } from 'utils/form';

import s from './SimpleForm.module.css';

const { Panel } = Collapse;
const { TabPane } = Tabs;

const noop = () => {};
const openAnimation = {
  appear: () => { },
  enter: () => { },
};
const SimpleForm = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  const {
    form, 
    initialValues,
    onSubmit,
    loading,
    config,
    dynamicConfig,
    size,
    submitText,
    submitIcon,
    autoSubmit,
    disabled,
    children,
    itemClassName,
    collapseActiveKeys,
    tabsConfig,
    ...restProps
  } = props;

  const cls = cx({
    [s.formItem] : true,
    ...itemClassName,
  });

  const { state: collapseState, onToggleSection } = useCollapse(collapseActiveKeys);
  const formConfig = dynamicConfig ? extendConfigByFieldValues(config, dynamicConfig, { form, initialValues }) : config;
  const [formItems, { sectionsIndex, getFormItem }] = useFormItems({ ref, form, initialValues, config: formConfig, size, itemClassName: cls });

  const formContent = useMemo(() => {
    let items = formItems;

    if (Object.keys(sectionsIndex).length > 1) { // if not only default section
      items = (
        <Tabs defaultActiveKey="1" animated={false}>
          {Object.entries(sectionsIndex).map(([key, section]) => {
            const subSections = Object.entries(section);

            if (!subSections.length) {
              return null;
            }

            let res = null;
            if (subSections.length > 1) {
              res = subSections.map(([subSectionKey, subSectionItems]) => {
                const subSectionFormItems = Object.entries(subSectionItems);

                return (
                  <Collapse
                    key={`${subSectionKey}_collapse`}
                    className={s.collapse}
                    bordered={false}
                    activeKey={collapseState.activePanelKey}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                    onChange={() => onToggleSection(subSectionKey)}
                    openAnimation={openAnimation}
                  >
                    <Panel header={t(subSectionKey)} key={subSectionKey}>
                      {subSectionFormItems.map(([itemKey, item]) => getFormItem(itemKey, item))}
                    </Panel>
                  </Collapse>
                );
              });
            } else {
              // if contains only default subsection
              const sectionFormItems = Object.entries(getOr({}, '[0][1]', subSections));
              res = sectionFormItems.map(([itemKey, item]) => getFormItem(itemKey, item));
            }

            const onTabClose = get(`${key}.onTabClose`, tabsConfig) || noop;
            const closable = get(`${key}.closable`, tabsConfig) || false;
            
            let title = key;
            const numTitle = title.match(/(\D+)(\d+)/);

            if (numTitle?.[2]) {
              title = `${t(numTitle?.[1])}${numTitle?.[2]}`;
            }

            const tab = (
              <div>
                {t(title)}
                {closable && (
                  <Button onClick={() => onTabClose(key)} type="link" shape="circle" icon="close" size="small" className={s.close} />
                )}
              </div>
            );

            return (
              <TabPane
                tab={tab} 
                key={key}
              >
                {res}
              </TabPane>
            );
          })}
        </Tabs>
      );
    }

    return items;
  },
  [collapseState.activePanelKey, formItems, getFormItem, onToggleSection, sectionsIndex, tabsConfig, t]
  );

  const onFormSubmit = (e) => {
    form.validateFields((err, values) => {
      if (err) {
        console.log('Error: ', values);
        return;
      }

      onSubmit(values);
    });

    e.preventDefault();
  };

  return (
    <Row gutter={24}>
      <Form 
        onSubmit={onFormSubmit} 
        {...restProps}
      >
        {formContent}
        {submitText && (
          <div style={{ display: 'flex', width: '100%', paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5 }}>
            <Button loading={loading} onClick={onFormSubmit} disabled={disabled} type="primary" ghost style={{ width: '100%' }} htmlType="submit" block>
              <Icon type={submitIcon} />
              {submitText}
            </Button>
          </div>
        )}
        {children(onFormSubmit)}
      </Form>
    </Row>
  );
});

SimpleForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  initialValues: PropTypes.object,
  config: PropTypes.object,
  dynamicConfig: PropTypes.object,
  style: PropTypes.object,
  size: PropTypes.string,
  submitIcon: PropTypes.string,
  submitText: PropTypes.string,
  autoSubmit: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.func,
  itemClassName: PropTypes.object,
  collapseActiveKeys: PropTypes.array,
  tabsConfig: PropTypes.object,
};

SimpleForm.defaultProps = {
  loading: false,
  initialValues: {},
  config: null,
  dynamicConfig: null,
  style: {},
  size: 'default',
  submitIcon: 'reload',
  submitText: null,
  autoSubmit: false,
  disabled: false,
  children: noop,
  itemClassName: {},
  collapseActiveKeys: [],
  tabsConfig: {},
};

export default Form.create({
  onValuesChange: (props, _changedValues, allValues) => {
    const { autoSubmit, onSubmit } = props;

    if (autoSubmit) {
      onSubmit(allValues, { autoSubmit });
    }
  }
})(SimpleForm);
