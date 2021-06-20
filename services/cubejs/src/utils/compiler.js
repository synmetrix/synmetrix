const vm = require('vm');
const ramda = require('ramda');

const { prepareCompiler } = require('@cubejs-backend/schema-compiler/dist/src/compiler/PrepareCompiler.js');
const { dataSchemaFiles } = require('./dataSourceHelpers');

const prepareSchemaFilesCompiler = (schemaFiles, options = {}) => prepareCompiler({
  localPath: () => __dirname,
  dataSchemaFiles: () => Promise.resolve(schemaFiles),
}, options);

exports.prepareSchemaFilesCompiler = prepareSchemaFilesCompiler;

const errorsReport = {
  exitFile: () => {
    this.file = null;
  },
  inFile: (file) => {
    this.file = file;
  },
  error: e => console.error(e),
};

const transpileSchemas = async ({ dataSource }, context) => {
  const schemaFiles = await dataSchemaFiles({ dataSourceId: dataSource.id }, context);
  const { compiler } = prepareSchemaFilesCompiler(schemaFiles, { adapter: dataSource.db_type });

  const files = (schemaFiles || []).map(file => compiler.transpileFile(file, errorsReport));

  return {
    compiler,
    files,
  };
};

exports.transpileSchemas = transpileSchemas;

const compileSchemas = async (compiler, files) => {
  const cubes = [];
  const exports = {};
  const contexts = [];
  const dashboardTemplates = [];
  const compiledFiles = {};
  const asyncModules = [];

  files.forEach((file) => {
    compiler.compileFile(
      file,
      errorsReport,
      cubes,
      exports,
      contexts,
      dashboardTemplates,
      files,
      compiledFiles,
      asyncModules
    );
  });

  await asyncModules.reduce((a, b) => a.then(() => b()), Promise.resolve());

  return cubes;
};

const parseSchemas = async ({ dataSource }, context) => {
  const { compiler, files } = await transpileSchemas({ dataSource }, context);

  const cubes = await compileSchemas(compiler, files);

  return files.map((file, index) => {
    const cubeDefinition = cubes.find(cube => cube.fileName === file.fileName);

    if (!cubeDefinition) {
      console.warn(`Can't find cubeDefinition for the transpiled file ${file.fileName}`);
      return null;
    }

    const { name, fileName, ...cubeQueryFields } = cubeDefinition;

    return {
      ...files[index],
      cubeDefinition: cubeQueryFields,
      cube: name,
    };
  }).filter(Boolean);
};

exports.parseSchemas = parseSchemas;

const mergeCubeDefinitions = (file, cubeDefinition) => {
  if (!file.cubeDefinition) {
    throw new Error('File should contain cubeDefinition prop. Try to parseTranspiledSchema');
  }

  let newCubeDefinition = {};
  newCubeDefinition = ramda.mergeDeepRight(file.cubeDefinition, cubeDefinition);

  return {
    ...file,
    newCubeDefinition,
  };
};

exports.mergeCubeDefinitions = mergeCubeDefinitions;

const replaceAll = (str, searchStr, replaceStr) => {
  // escape regexp special characters in search string
  searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
};

const cubeRegexp = new RegExp(/cube\(.*,\s({[\s\S]+})\)/, 'gm');
const modifySchemas = ({ 
  allCubeDefinitions,
  scaffoldingTemplate,
  cubeName,
  addCubeDefinition 
}) => {
  const cubeDefinitions = allCubeDefinitions
    .filter(schema => schema.cube === cubeName)
    .map(schema => mergeCubeDefinitions(schema, addCubeDefinition));

  if (!cubeDefinitions.length) {
    throw new Error(`modifySchemas: allCubeDefinitions don\'t contain any ${cubeName}`)
  }

  const modifedSchemas = cubeDefinitions.map(cubeDefinition => {
    const { 
      fileName,
      content,
      newCubeDefinition,
    } = cubeDefinition;

    const contentMatch = [...content.matchAll(cubeRegexp)];

    let newCubeDefinitionStr = scaffoldingTemplate.render(newCubeDefinition);
    newCubeDefinitionStr = replaceAll(newCubeDefinitionStr, 'CUBE => ', '');
    newCubeDefinitionStr = replaceAll(newCubeDefinitionStr, 'FILTER_PARAMS => ', '');
    newCubeDefinitionStr = replaceAll(newCubeDefinitionStr, 'TABLE => ', '');
    newCubeDefinitionStr = replaceAll(newCubeDefinitionStr, '() => ', '');

    try {
      const cubeContent = contentMatch[0][1];
      const newContent = content.replace(cubeContent, newCubeDefinitionStr);

      return {
        fileName,
        content: newContent,
      };
    } catch (err) {
      console.error(`Can't find cube definition in ${fileName}`);
      console.error(err);

      const defaultTemplate = scaffoldingTemplate.renderFile(newCubeDefinition)

      return {
        fileName,
        content: defaultTemplate,
      };
    }
  });

  return modifedSchemas;
};


exports.modifySchemas = modifySchemas;

const updateJoins = async ({ dataSource, files, relations, scaffoldingTemplate }, context) => {
  const { pgClient } = context;
  const allCubeDefinitions = await parseSchemas({ dataSource }, context);

  const schemaUpdates = [];
  const definitionToSqlType = {
    date: 'TIMESTAMP',
    category: 'STRING',
    binary: 'BYTES',
    text: 'STRING',
    numerical: 'FLOAT64',
    sequence: 'STRING',
    timeseries: 'STRING',
  };

  files.forEach((generatedFile, index) => {
    const { cubeName: foreignCubeName } = generatedFile;
    const { addCubeJoins = [] } = relations[index];

    addCubeJoins.forEach(join => {
      const { primaryKeyType } = join;
      let { primaryKey, foreignKey } = join;

      const [primaryCubeName, primaryCubeField] = primaryKey.split('.', 2);
      const [_, foreignCubeField] = foreignKey.split('.', 2);

      foreignKey = `${foreignCubeName}.${foreignCubeField}`;
      primaryKey = `CUBE.${primaryCubeField}`;

      const sqlType = definitionToSqlType[primaryKeyType] || 'STRING';
      const joinSql = `CAST(\${${primaryKey}} AS ${sqlType}) = CAST(\${${foreignKey}} AS ${sqlType})`;

      const addPrimaryCubeDefinition = {
        joins: {
          [foreignCubeName]: {
            sql: joinSql,
            relationship: join.primaryRelation, 
          }
        },
        dimensions: {
          [primaryCubeField]: {
            primaryKey: true,
            shown: true,
          },
        },
      };

      const addForeignCubeDefinition = {
        dimensions: {
          [foreignCubeField]: {
            primaryKey: true,
            shown: true,
          },
        },
      };

      const modifiedPrimarySchemas = modifySchemas({
        allCubeDefinitions,
        scaffoldingTemplate,
        cubeName: primaryCubeName,
        addCubeDefinition: addPrimaryCubeDefinition,
      });

      const modifiedForeignSchemas = modifySchemas({
        allCubeDefinitions,
        scaffoldingTemplate,
        cubeName: foreignCubeName,
        addCubeDefinition: addForeignCubeDefinition,
      });

      [...modifiedPrimarySchemas, ...modifiedForeignSchemas].forEach(newSchema => {
        schemaUpdates.push(pgClient.query(
          'UPDATE mlworkflow.dataschemas SET code = $1 WHERE datasource_id = $2 AND name = $3',
          [newSchema.content, dataSource.id, newSchema.fileName]
        ));
      });
    });
  });

  return Promise.all(schemaUpdates);
};

exports.updateJoins = updateJoins;
