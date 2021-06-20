import { get, getOr } from 'unchanged';

// eslint-disable-next-line import/prefer-default-export
export const validationWrap = (form, onSubmit) => e => {
  e.preventDefault();

  form.validateFields((err, values) => {
    if (!err) {
      onSubmit(values, form);
    }
  });
};

export const extendConfigByFieldValues = (config, definitions, { form, initialValues }) => {
  let formConfig = { ...config };
  const entries = Object.entries(definitions);

  entries.forEach(([key, definition]) => {
    const reducer = (acc, val) => ({ ...acc, ...definition[val] });

    let result = {};
    let values = form.getFieldValue(key);
    if (!values) {
      const ddefault = get([key, 'default'], formConfig);
      values = getOr(ddefault, key, initialValues);
    }

    if (!Array.isArray(values)) {
      result = [values].reduce(reducer, {});
    } else {
      result = values.reduce(reducer, {});
    }

    formConfig = { ...formConfig, ...result };
  });

  return formConfig;
};
