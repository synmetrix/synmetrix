import { useCallback, useState, useEffect, useMemo, useReducer } from 'react';
import { remove, get, set, merge, getOr, assign } from 'unchanged';

import safeJsonParse from 'utils/safeJsonParse';
import equals from 'utils/equals';
import keyify from 'utils/keyify';
import isPrimitive from 'utils/isPrimitive';

import useDeepCompareEffect from 'hooks/useDeepCompareEffect';
import { getColumns } from 'hooks/usePlayground';

const defaultResources = { cpu_rate: 4000, ram_rate: 1024 };

const initialState = {
  hyperopt: {
    optimization: 'no',
    epochs: 5,
    num_samples: 5,
  },
  preprocessing: {
    dropna: {},
    split_column: null,
    split_probabilities: {
      train: 0.7,
      validation: 0.1,
      test: 0.2,
    }
  },
  training: {
    learning_rate: 0.001,
    batch_size: 128,
    epochs: 100,
    early_stop: 15,

    regularization_lambda: 0,
    dropout_rate: 0.0,
    learning_rate_warmup_epochs: 1,

    decay: 'no',
    decay_rate: 0.96,
    staircase: 'no',

    reduce_learning_rate_on_plateau: 0,
    reduce_learning_rate_on_plateau_patience: 5,
    reduce_learning_rate_on_plateau_rate: 0.5,

    increase_batch_size_on_plateau: 0,
    increase_batch_size_on_plateau_rate: 2,
    increase_batch_size_on_plateau_patience: 5,
    increase_batch_size_on_plateau_max: 512,
    combiner: {
      type: 'concat',
      num_fc_layers: 0,
    },
  },
  features: {},
  resources: defaultResources,
  constraints: {
    max_rows: 50000,
    node_name: 'auto'
  }
};

export const featureTypes = [
  'date',
  'binary',
  'numerical',
  'category',
  'timeseries',
  'sequence',
  'text',
];

// https://uber.github.io/ludwig/user_guide/#date-features
export const columnToFeature = {
  string: 'category',
  number: 'numerical',
  time: 'date',
  boolean: 'binary',
};

const reducer = (state, action) => {
  if (action.type === 'add') {
    return set(
      ['features', action.name],
      {
        name: action.name,
        dataType: action.dataType,
        checked: false,
        meta: action.meta || {},
      },
      state
    );
  }

  if (action.type === 'remove') {
    return remove(
      ['features', action.name],
      state,
    );
  }

  if (action.type === 'changeFeatureType') {
    const changedMeta = set(['features', action.name, 'meta'], action.meta || {}, state);
    return set(['features', action.name, 'dataType'], action.dataType, changedMeta);
  }

  if (action.type === 'setSetting') {
    return set(action.keyPath, action.value, state);
  }

  if (action.type === 'assignState') {
    return assign(null, action.value, state);
  }

  if (action.type === 'reset') {
    return set('features', action.newFeatures, state);
  }

  if (action.type === 'clear') {
    return initialState;
  }

  throw new Error(`Unknown action ${action.type}.`);
};

export const getSplitEntries = state => {
  const splitCol = get('preprocessing.split_column', state);
  return splitCol;
};

export const getDropNaColumns = state => {
  const dropna = get('preprocessing.dropna', state) || {};
  const res = Object.entries(dropna)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key);

  return res;
};

const getStateOrDefault = (keyPath, state = {}) => {
  let val = get(keyPath, state);
  
  if (typeof(val) === 'undefined') {
    val = get(keyPath, initialState);
  }

  return val;
};

const restoreObject = (key, obj, state) => {
  const savedValueToFormValue = {
    true: 'yes',
    false: 'no',
  };

  const newState = Object.keys(obj).reduce((acc, currKey) => {
    const currValue = obj[currKey];

    return {
      ...acc,
      [currKey]: savedValueToFormValue[currValue] || currValue || getStateOrDefault([key, currKey]),
    };
  }, {});

  return set(key, newState, state);
};

const restoreFeature = (state, feature, isOutput) => {
  let newState = state;

  const meta = {};
  const missingStrategy = get('preprocessing.missing_value_strategy', feature);
  const normalization = get('preprocessing.normalization', feature);
  const seqLength = get('seq_length', feature);
  const matrixProfile = get('matrix_profile', feature);

  if (missingStrategy === 'drop_row') {
    newState = set(['preprocessing', 'dropna', feature.name], true, newState);
  } else {
    newState = set(['preprocessing', 'dropna', feature.name], false, newState);
  }

  newState = set(['features', feature.name, 'dataType'], feature.type, newState);
  newState = set(['features', feature.name, 'checked'], isOutput, newState);

  if (seqLength) {
    meta.seqLength = seqLength;
  }

  if (matrixProfile) {
    meta.matrixProfile = matrixProfile;
  }

  if (normalization) {
    meta.normalization = normalization;
  }

  newState = set(['features', feature.name, 'meta'], meta, newState);
  return newState;
};

export const restoreState = (dataDefinition) => {
  if (!dataDefinition) {
    console.error('No dataDefinition to restore the state');
    return null;
  }

  const { 
    input_features: inputFeatures = [],
    output_features: outputFeatures = [],
    preprocessing = {},
    training = {},
    resources = {},
    hyperopt = {},
    constraints = {},
  } = safeJsonParse(null, dataDefinition);

  let newState = {
    preprocessing,
    resources,
    hyperopt,
    constraints,
  };

  if (preprocessing.dropna) {
    delete newState.preprocessing.dropna;
  }

  inputFeatures.forEach(feature => {
    newState = restoreFeature(newState, feature, false);
  });

  outputFeatures.forEach(feature => {
    newState = restoreFeature(newState, feature, true);
  });

  const splitProbs = getOr([], 'split_probabilities', preprocessing);
  if (splitProbs && splitProbs.length) {
    newState = set(
      'preprocessing.split_probabilities', 
      {
        train: splitProbs[0] || 0.7,
        validation: splitProbs[1] || 0.1,
        test: splitProbs[2] || 0.2,
      },
      newState
    );
  }

  if (Object.keys(training).length) {
    newState = restoreObject('training', training, newState);
  }

  if (Object.keys(hyperopt).length) {
    newState = restoreObject('hyperopt', hyperopt, newState);
  }

  if (Object.keys(constraints).length) {
    newState = restoreObject('constraints', constraints, newState);
  }

  return newState;
};

export default (defaultState, selectedQueryMembers) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFeature = (name, dataType, meta = {}) => dispatch({ type: 'add', name, dataType, meta });
  const removeFeature = (name) => dispatch({ type: 'remove', name });
  const changeFeatureType = (name, dataType, meta = {}) => dispatch({ type: 'changeFeatureType', name, dataType, meta });
  const setSetting = (keyPath, value) => dispatch({ type: 'setSetting', keyPath, value });
  const assignState = (value) => dispatch({ type: 'assignState', value });

  const columns = useMemo(() => {
    if (!selectedQueryMembers) { return [] };

    return getColumns(selectedQueryMembers).map(col => ({ name: col.id, type: col.type }));
  },
  [selectedQueryMembers]
  );

  const [members, setMembers] = useState(columns);
  const normalizeMembers = useCallback((prevMembers, newMembers) => {
    const getNames = arr => (arr || []).map(elem => elem.name);

    const prevMembersNames = [...getNames(prevMembers)];
    const prevMembersSet = new Set(prevMembersNames);

    const newMembersNames = [...getNames(newMembers)];
    const newMembersSet = new Set(newMembersNames);

    const addMembers = new Set(newMembers.filter(mem => !prevMembersSet.has(mem.name)));
    const removedMembers = new Set(prevMembers.filter(mem => !newMembersSet.has(mem.name)));

    addMembers.forEach(mem => {
      console.log('Add ', mem);

      const { name, type, meta = {} } = mem;
      const featureType = columnToFeature[type] || type;

      addFeature(name, featureType, meta);
      setSetting(['preprocessing', 'dropna', name], true);
    });

    removedMembers.forEach(mem => {
      console.log('Remove ', mem);

      const { name } = mem;
      removeFeature(name);
    });

    return newMembers;
  },
  []
  );

  const restoreDataDefinition = useCallback(() => {
    if (defaultState) {
      const defaultStateKeys = keyify(merge(null, initialState, defaultState));

      defaultStateKeys.forEach(key => {
        const initialValue = get(key, initialState);
        const val = getOr(initialValue, key, defaultState);

        if (isPrimitive(val)) {
          setSetting(key, val);
        }
      });
    }
  }, [defaultState]);

  useEffect(() => {
    setMembers(prevMembers => {
      let newState = prevMembers;

      if (!equals(prevMembers, columns)) {
        newState = normalizeMembers(prevMembers, columns);
      }

      return newState;
    });
  }, 
  [columns, normalizeMembers]
  );

  useDeepCompareEffect(
    () => {
      if (members.length && Object.keys(state.features).length) {
        const reorderedFeatures = members.filter(Boolean).reduce((acc, curr) => {
          const item = state.features[curr.name];

          return {
            ...acc,
            [curr.name]: item,
          };
        }, {});

        dispatch({ type: 'reset', newFeatures: reorderedFeatures });
      }
    },
    [state.features]
  );

  useEffect(
    restoreDataDefinition,
    [members]
  );

  useEffect(
    () => {
      if (members && members.length) {
        restoreDataDefinition();
      }
    },
    [defaultState, members, restoreDataDefinition]
  );

  const getModelDefinition = useCallback(() => {
    const splitColumn = get('preprocessing.stratify', state);
    const splitProbs = get('preprocessing.split_probabilities', state);
    const dropnaCols = getDropNaColumns(state);

    let preprocessing = {
      force_split: true,
    };

    if (splitProbs) {
      preprocessing.split_probabilities = [
        getStateOrDefault('preprocessing.split_probabilities.train', state),
        getStateOrDefault('preprocessing.split_probabilities.validation', state),
        getStateOrDefault('preprocessing.split_probabilities.test', state),
      ];
    }

    if (splitColumn) {
      preprocessing = {
        // using "split" column
        force_split: true,
        stratify: splitColumn,
      };
    }

    if (dropnaCols.length) {
      preprocessing.dropna = dropnaCols;
    }

    const training = Object.keys(state.training).reduce((acc, key) => {
      const val = getStateOrDefault(`training.${key}`, state);

      return {
        ...acc,
        [key]: val,
      };
    }, {});

    const res = {
      hyperopt: {
        optimization: getStateOrDefault('hyperopt.optimization', state).toLowerCase() === 'yes',
        epochs: getStateOrDefault('hyperopt.epochs', state),
        num_samples: getStateOrDefault('hyperopt.num_samples', state),
      },
      preprocessing,
      training: {
        ...training,
        decay: getStateOrDefault('training.decay', state).toLowerCase() === 'yes',
        staircase: getStateOrDefault('training.staircase', state).toLowerCase() === 'yes',
      },
      input_features: [],
      output_features: [],
      resources: {
        cpu_rate: getStateOrDefault('resources.cpu_rate', state),
        ram_rate: getStateOrDefault('resources.ram_rate', state),
      },
      constraints: {
        node_name: getStateOrDefault('constraints.node_name', state),
        max_rows: getStateOrDefault('constraints.max_rows', state)
      }
    };

    Object.values(state.features).forEach(f => {
      const { name, dataType, meta = {}, checked } = f;
      const resK = !checked ? 'input_features' : 'output_features';

      if (name !== splitColumn) {
        const additionalParams = {
          preprocessing: {},
        };

        if (meta.seqLength) {
          additionalParams.seq_length = meta.seqLength;
        }

        if (meta.matrixProfile) {
          additionalParams.matrix_profile = meta.matrixProfile;
        }

        if (meta.normalization) {
          additionalParams.preprocessing.normalization = meta.normalization;
        }

        if (dropnaCols && dropnaCols.includes(name)) {
          additionalParams.preprocessing.missing_value_strategy = 'drop_row';
        }

        // don't pass preprocessing key if not present
        if (!Object.keys(additionalParams.preprocessing).length) {
          delete additionalParams.preprocessing;
        }

        res[resK].push({
          name,
          type: dataType,
          ...additionalParams,
        });
      }
    });

    return res;
  },
  [state]
  );

  return {
    members,
    setMembers,
    state,
    setSetting,
    assignState,
    changeFeatureType,
    getModelDefinition,
  };
};
