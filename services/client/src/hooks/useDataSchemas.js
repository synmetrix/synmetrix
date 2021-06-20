import { useMemo, useCallback, useEffect } from 'react';

import { getOr } from 'unchanged';

import nanoid from 'nanoid';

import { useQuery, useMutation } from 'urql';
import trackEvent from 'utils/trackEvent';

import useAuthContext from './useAuthContext';

const newDataSchemaMutation = `
  mutation NewDataSchemaMutation($input: CreateDataschemaInput!) {
    createDataschema(input: $input) {
      dataschemaEdge {
        node {
          id
          name
        }
      }
    }
  }
`;

const editDataSchemaMutation = `
  mutation EditDataSchemaMutation($input: UpdateDataschemaInput!) {
    updateDataschema(input: $input) {
      dataschema {
        id
        name
      }
    }
  }
`;

const editDataSchemaQuery = `
  query EditDataSchemaQuery($dataSourceId: Int!, $name: String!) {
    dataschemaByName: allDataschemas(condition: { datasourceId: $dataSourceId, name: $name }, first: 1) {
      nodes {
        id
        name
        code
      }
    }
  }
`;

const dataschemasQuery = `
  query DataSchemasQuery($dataSourceId: Int!) {
    allDataschemas(condition: { datasourceId: $dataSourceId }, first: 999) {
      nodes {
        id
        name
        code
      }
    }
  }
`;

const deleteDataschemaMutation = `
  mutation DeleteDataSchemaMutation($input: DeleteDataschemaInput!) {
    deleteDataschema(input: $input) {
      deletedDataschemaId
      dataschemaEdge {
        node {
          name
        }
      }
    }
  }
`;

const genDataschemasMutation = `
  mutation GenDataSchemaMutation($input: GenerateSchemaInput!) {
    generateDataschemaFiles(input: $input) {
      status
    }
  }
`;

const validateDataschemasMutation = `
  mutation ValidateCodeMutation($input: ValidateCodeInput!) {
    validateCode(input: $input) {
      status
    }
  }
`;

export default ({ dataSourceId, editId, pauseQueryAll }) => {
  const currentUser = useAuthContext();

  const [createMutation, execNewMutation] = useMutation(newDataSchemaMutation);
  const mExecNewMutation = dataschema => {
    const clientMutationId = nanoid();

    trackEvent('Create DataSchema');

    execNewMutation({
      input: {
        clientMutationId,
        dataschema: {
          ...dataschema,
          code: dataschema.code || '',
          datasourceId: parseInt(dataSourceId, 10),
          userId: currentUser.userId,
        },
      }
    });
  };

  const [allData, executeQueryAll] = useQuery({
    query: dataschemasQuery,
    variables: {
      dataSourceId: parseInt(dataSourceId, 10),
    },
    pause: true,
  });

  const all = useMemo(() => getOr([], 'data.allDataschemas.nodes', allData), [allData]);

  useEffect(() => {
    if (!pauseQueryAll) {
      executeQueryAll({ requestPolicy: 'network-only' });
    }
  }, [pauseQueryAll, executeQueryAll]);

  const [currentData, executeQueryCurrent] = useQuery({
    query: editDataSchemaQuery,
    variables: {
      dataSourceId: parseInt(dataSourceId, 10),
      name: editId,
    },
    pause: true,
  });

  const current = useMemo(() => getOr({}, 'data.dataschemaByName.nodes.0', currentData), [currentData]);

  useEffect(() => {
    if (editId && !currentData.data) {
      executeQueryCurrent({ requestPolicy: 'network-only' });
    }
  }, [editId, executeQueryCurrent, currentData.data]);

  const [validateMutation, execValidateMutation] = useMutation(validateDataschemasMutation);
  const mExecValidateMutation = useCallback(() => {
    const id = parseInt(dataSourceId, 10);
    trackEvent('Validate DataSchema');

    execValidateMutation({
      input: {
        dataSourceId: id,
      },
    });
  }, [dataSourceId, execValidateMutation]);

  const [editMutation, execEditMutation] = useMutation(editDataSchemaMutation);
  const mExecEditMutation = useCallback(
    (id, dataschemaPatch) => {
      trackEvent('Edit DataSchema');
      execEditMutation({
        input: {
          id,
          dataschemaPatch,
        },
      });
    },
    [execEditMutation]
  );

  useEffect(() => {
    if (editMutation.data) {
      mExecValidateMutation();
    }
  }, [editMutation.data, mExecValidateMutation]);

  useEffect(() => {
    if (createMutation.data) {
      mExecValidateMutation();
    }
  }, [createMutation.data, mExecValidateMutation]);

  const [delMutation, execDelMutation] = useMutation(deleteDataschemaMutation);
  const mExecDelMutation = useCallback(id => {
    trackEvent('Delete DataSchema');

    execDelMutation({
      input: { id },
    });
  }, [execDelMutation]);

  const [genMutation, execGenMutation] = useMutation(genDataschemasMutation);
  const mExecGenMutation = useCallback(tables => {
    trackEvent('Generate DataSchema');

    execGenMutation({
      input: {
        dataSourceId: parseInt(dataSourceId, 10),
        tables,
      },
    });
  }, [execGenMutation, dataSourceId]);

  return {
    all,
    current,
    queries: {
      allData, executeQueryAll,
      currentData, executeQueryCurrent,
    },
    mutations: {
      createMutation, mExecNewMutation,
      editMutation, mExecEditMutation,
      validateMutation, mExecValidateMutation,
      delMutation, mExecDelMutation,
      genMutation, mExecGenMutation,
    },
  };
};
