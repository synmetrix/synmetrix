import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useXState from 'hooks/useXState';

export default (defaultState, resourcesAdvice = {}) => {
  const { t } = useTranslation();
  const [state, updateState, setState] = useXState(defaultState);

  useEffect(
    () => updateState(defaultState),
    [defaultState, updateState]
  );

  const { CPURate, RAMRate } = resourcesAdvice;

  const formConfig = {
    'resources.cpu_rate': {
      section: t('Resources'),
      label: 'CPURate',
      display: 'text',
      type: 'number',
      required: true,
      min: 0,
      step: 100,
      span: 12
    },
    'resources.ram_rate': {
      section: t('Resources'),
      label: 'RAMRate',
      display: 'text',
      type: 'number',
      required: true,
      min: 0,
      step: 128,
      span: 12
    }
  };

  if (CPURate) {
    formConfig.recommendation = {
      section: t('Resources'),
      span: 24,
      display: 'message',
      type: 'info',
      style: { marginBottom: 0 },
      text: (
        <div>
          Recommendation: <br />
          CPU – {CPURate} <br />
          RAM – {RAMRate}
        </div>
      )
    };
  }

  return {
    state,
    updateState,
    setState,
    formConfig,
  };
};
