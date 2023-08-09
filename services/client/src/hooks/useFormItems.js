import React, { useCallback, useMemo, useImperativeHandle } from 'react';
import i18n from 'i18next';
import { set, get } from 'unchanged';
import { useTranslation } from 'react-i18next';

import { Col, Form, Input, Checkbox, Upload, message, Select, Button, Divider, Tooltip, Icon, DatePicker } from 'antd';

import { useSetState } from 'ahooks';
import Slider from 'components/Slider';
import InputNumber from 'components/InputNumber';
import ErrorMessage from 'components/ErrorMessage';
import InputDate from 'components/InputDate';
import ruLocale from 'antd/es/date-picker/locale/ru_RU';
import enLocale from 'antd/es/date-picker/locale/en_US';

const { TextArea } = Input;
const { Option } = Select;
const noop = () => { };
const DEFAULT_INPUT_SIZE = 'default';
const DEFAULT_MODE = 'create';

export const locales = {
  ru: ruLocale,
  en: enLocale,
};

export const getOptionValue = obj => Object.values(obj).join('_');

export default ({ ref, form, initialValues, config, size = DEFAULT_INPUT_SIZE, itemClassName, mode = DEFAULT_MODE }) => {
  const { t } = useTranslation();
  const [state, updateState] = useSetState({});

  const sectionsIndex = useMemo(
    () => {
      const entries = config ? Object.entries(config) : [];

      const sections = entries.reduce((acc, [key, val]) => {
        const { section = 'default', subSection = 'default' } = val || {};

        return set([section, subSection, key], val, acc);
      }, {});

      return sections;
    },
    [config]
  );

  useImperativeHandle(ref, () => ({
    form
  }));

  const parseFile = useCallback((file, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const fileJson = JSON.parse(e.target.result);

        callback(updateState, form, fileJson);
      } catch (err) {
        message.error('JSON is not valid.');
      }
    };

    reader.readAsText(file);

    return false;
  }, [form, updateState]);

  const getInput = useCallback((value, key) => {
    let { disabled } = value;

    if (mode === 'update' && value.updateable === false) {
      disabled = true;
    }

    if (value.display === 'checkbox') {
      return (
        <Checkbox disabled={disabled} />
      );
    }

    if (value.display === 'file') {
      const propsByAccept = {};

      if (!value.accept || value.accept === '.json') {
        propsByAccept.beforeUpload = (file) => parseFile(file, value.onChange || noop);
      }

      if (value.accept === '.csv') {
        propsByAccept.onChange = value.onChange || noop;
      }

      return (
        <Upload
          name={key}
          type="drag"
          accept={value.accept || '.json'}
          showUploadList={value.showUploadList || false}
          multiple={value.multiple}
          action={value.action}
          {...propsByAccept}
        >
          {value.placeholder}
        </Upload>
      );
    }

    if (value.display === 'range') {
      return (
        <Slider min={value.min} max={value.max} />
      );
    }

    if (value.display === 'select') {
      return (
        <Select
          mode={value.mode || 'default'}
          showSearch={value.showSearch}
          placeholder={value.placeholder}
          size={value.size || size}
          allowClear={typeof value.allowClear !== 'undefined' ? value.allowClear : true}
          disabled={disabled}
          tokenSeparators={[',', ' ']}
          optionLabelProp={value.optionLabelProp}
          onDropdownVisibleChange={value.onDropdownVisibleChange}
          optionFilterProp={value.optionFilterProp || 'value'}
        >
          {(value.values || []).map((obj) => {
            // solution for complex select options
            if (value.optionLabelProp === 'label') {
              const optionValue = get('0', Object.keys(obj));
              const optionTitle = get('0', Object.values(obj));

              return <Option key={optionValue} value={optionValue} label={optionValue} title={optionTitle}>{optionTitle}</Option>;
            }

            const optionValue = (getOptionValue(obj) || '').toString();
            const optionTitle = Object.keys(obj).join('_');

            return (
              <Option key={optionValue} value={optionValue} title={optionTitle}>{t(optionTitle)}</Option>
            );
          })}
        </Select>
      );
    }

    if (value.display === 'text' && value.type === 'number') {
      return (
        <InputNumber
          min={value.min}
          max={value.max}
          placeholder={value.placeholder}
          size={value.size || size}
          step={value.step}
          disabled={disabled}
        />
      );
    }

    if (value.display === 'date' && value.type === 'filter') {
      return (
        <InputDate
          values={value.values}
          onChange={value.onChange}
          locale={locales?.[i18n.language] || locales.en}
        />
      );
    }

    if (value.display === 'date') {
      return (
        <DatePicker
          values={value.values}
          onChange={value.onChange}
          showTime={value.showTime}
          allowClear={value.allowClear}
          placeholder={value?.placeholder ? t(value.placeholder) : t('Select date')}
          locale={locales?.[i18n.language] || locales.en}
        />
      );
    }

    if (value.display === 'text' && value.type === 'string') {
      return (
        <TextArea
          rows={value.rows || 3}
          placeholder={value.placeholder}
          size={value.size || size}
          disabled={disabled}
          autoSize
        />
      );
    }

    if (value.display === 'message') {
      return (
        <ErrorMessage
          type={value.type}
          style={value.style || {}}
          text={value.text}
          icon={value.icon}
        />
      );
    }

    if (value.display === 'text' && value.type === 'password') {
      return (
        <Input.Password
          size={value.size || size}
          disabled={disabled}
        />
      );
    }

    return (
      <Input
        size={value.size || size}
        placeholder={value.placeholder}
        disabled={disabled}
        type={value.type}
        suffix={value.suffix && (
          <Tooltip title={value.suffix}>
            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        )}
      />
    );
  }, [parseFile, size, mode, t]);

  const getButton = useCallback((value, key) => {
    return (
      <Col key={key} span={value.span || 12}>
        <Button
          size={value.size || size}
          disabled={value.disabled}
          icon={value.icon}
          onClick={value.onClick}
          shape={value.shape}
        />
      </Col>
    );
  }, [size]);

  const getFormItem = useCallback((key, value) => {
    let initialValue = get(key, initialValues);

    if (typeof(initialValue) === 'undefined') {
      initialValue = value.default;
    }

    if (value.display === 'none') {
      return null;
    }

    if (value.display === 'button') {
      return getButton(value, key);
    }

    if (value.display === 'divider') {
      return <Divider style={value.style} orientation={value.orientation || 'left'}>{t(value.label)}</Divider>;
    }

    if (initialValue === '') {
      initialValue = undefined;
    } else if (typeof initialValue !== 'undefined' && initialValue !== null && ['string'].indexOf(value.type) > -1) {
      initialValue = initialValue.toString();
    }

    const rules = [];
    if (value.required) {
      rules.push({ required: value.required, message: `${value.name || value.label} is required` });
    }

    if (value.rules && Array.isArray(value.rules)) {
      rules.push(...value.rules);
    }

    const label = typeof value.label === 'string' ? t(value.label) : value.label;

    return (
      <Col key={key} span={value.span || 12}>
        <Form.Item
          key={key}
          className={itemClassName}
          label={label}
          required={value.required || false}
          hasFeedback={state[`hasFeedback.${key}`] || false}
        >
          {form.getFieldDecorator(key, {
            initialValue,
            valuePropName: value.display === 'checkbox' && 'checked' || 'value',
            type: value.type || 'string',
            rules,
          })(getInput(value, key))}
        </Form.Item>
      </Col>
    );
  }, [initialValues, itemClassName, state, form, getInput, getButton, t]);

  const formItems = useMemo(
    () => Object.entries(config || {}).filter(([_, value]) => value).map(([key, value]) => getFormItem(key, value)),
    [config, getFormItem]
  );

  return [formItems, { sectionsIndex, parseFile, getInput, getFormItem }];
};
