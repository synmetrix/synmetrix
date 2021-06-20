const inflection = require('inflection');
const ScaffoldingSchema = require('./ScaffoldingSchema');
const UserError = require('@cubejs-backend/schema-compiler/dist/src/compiler/UserError');

const GRANULARITY_ARRAY = ['day', 'week', 'hour', 'month', 'year'];

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
};

class ScaffoldingTemplate {
  constructor(dbSchema, driver) {
    this.dbSchema = dbSchema;
    this.scaffoldingSchema = new ScaffoldingSchema(dbSchema);
    this.driver = driver;
  }

  escapeName(name) {
    if (this.eligibleIdentifier(name)) {
      return name;
    }

    return this.driver.quoteIdentifier(name);
  }

  eligibleIdentifier(name) {
    return !!name.match(/^[a-z0-9_]+$/);
  }

  generateFilesByTableDefinitions(tableDefinitions) {
    const tableNames = tableDefinitions.map(table => this.resolveTableName(table.name));
    const schemaForTables = this.scaffoldingSchema.generateForTables(tableNames);

    const files = schemaForTables.map(tableSchema => {
      const schemaDesc = this.schemaDescriptorForTable(tableSchema);

      return {
        cubeName: tableSchema.cube,
        tableName: tableSchema.tableName,
        fileName: tableSchema.cube + '.js',
        content: this.renderFile(schemaDesc),
      }
    });

    return files;
  }

  resolveTableName(tableName) {
    const tableParts = tableName.split('.');
    if (tableParts.length === 2) {
      this.scaffoldingSchema.resolveTableDefinition(tableName);
      return tableName;
    } else if (tableParts.length === 1) {
      const schema = Object.keys(this.dbSchema).find(schema => this.dbSchema[schema][tableName] || this.dbSchema[schema][inflection.tableize(tableName)]);
      if (!schema) {
        throw new UserError(`Can't find any table with '${tableName}' name`);
      }
      if (this.dbSchema[schema][tableName]){
        return `${schema}.${tableName}`;
      }
      if (this.dbSchema[schema][inflection.tableize(tableName)]){
        return `${schema}.${inflection.tableize(tableName)}`;
      }
    } else {
      throw new UserError(`Table names should be in <table> or <schema>.<table> format`);
    }
  }

  schemaDescriptorForTable(tableSchema) {
    const { joins = [] } = tableSchema || {};

    const columnsJoins = joins.reduce((mem, j) => {
      return {
        ...mem,
        [j.cubeToJoin]: {
          sql: `\${CUBE}.${this.escapeName(j.thisTableColumn)} = \${${j.cubeToJoin}}.${this.escapeName(j.columnToJoin)}`,
          relationship: j.relationship
        }
      };
    }, {});

    return {
      cube: tableSchema.cube,
      title: tableSchema.cube,
      sql: `SELECT * FROM ${this.escapeName(tableSchema.schema)}.${this.escapeName(tableSchema.table)}`, // TODO escape
      joins: columnsJoins,
      measures: tableSchema.measures.map(m => ({
        [this.memberName(m)]: {
          sql: this.sqlForMember(m),
          type: m.types[0],
          title: this.memberTitle(m)
        }
      })).reduce((a, b) => ({ ...a, ...b }), {
        count: {
          type: 'count',
          // drillMembers: tableSchema.drillMembers.map(m => new MemberReference(this.memberName(m)))
        }
      }),
      dimensions: tableSchema.dimensions.reduce((mem, dim) => {
        const dimensions = {};
        const type = dim.types[0];
        const sql = this.sqlForMember(dim);
        const title = this.memberTitle(dim);

        const fieldObject = {
          sql,
          type,
          title,
        };

        if (dim.isPrimaryKey) {
          fieldObject.primaryKey = true;
          fieldObject.shown = true;
        }

        if (type === 'number') {
          fieldObject.sql = `round(CAST(\${TABLE}.${fieldObject.sql} AS NUMERIC), 6)`;
        }

        const dimensionName = this.memberName(dim);
        dimensions[dimensionName] = fieldObject;

        // if (type === 'time') {
        //   const granTime = GRANULARITY_ARRAY.forEach(gran => {
        //     const timeDimensionName = dimensionName + capitalize(gran);
        //
        //     const timeFieldObject = {
        //       title: `${dimensionName} [${gran}]`,
        //       sql: `date_trunc('${gran}', ${sql})`,
        //       type,
        //     };
        //
        //     dimensions[timeDimensionName] = timeFieldObject;
        //   });
        // }

        return {
          ...mem,
          ...dimensions,
        };
      }, {}),
    };
  }

  sqlForMember(m) {
    // eslint-disable-next-line no-template-curly-in-string
    return `${this.escapeName(m.name) !== m.name || !this.eligibleIdentifier(m.name) ? '${CUBE}.' : ''}${this.escapeName(m.name)}`;
  }

  memberTitle(m) {
    return inflection.titleize(inflection.underscore(this.memberName(m))) !== m.title ? m.title : undefined;
  }

  memberName(member) {
    return inflection.camelize(inflection.underscore(member.name), true);
  }

  renderFile(fileDescriptor) {
    const { cube, ...descriptor } = fileDescriptor;
    return `cube(\`${cube}\`, ${this.render(descriptor, 0)});\n`;
  }

  render(descriptor, level) {
    const lineSeparator = ',\n' + (level < 2 ? '\n' : '');
    if (Array.isArray(descriptor)) {
      const items = descriptor.map(desc => this.render(desc, level + 1)).join(', ');
      return `[${items}]`;
    } else if (typeof descriptor === 'string') {
      return `\`${descriptor.replace(/`/g, '\\`')}\``;
    } else if (descriptor instanceof MemberReference) {
      return descriptor.member;
    } else if (typeof descriptor === 'object') {
      let entries = Object.keys(descriptor)
        .filter(k => descriptor[k] != null)
        .map(key => `${key}: ${this.render(descriptor[key], level + 1)}`).join(lineSeparator);
      entries = entries.split('\n').map(l => '  ' + l).join('\n');
      return `{\n${entries}\n}`
    } else {
      return descriptor.toString();
    }
  }
}

class MemberReference {
  constructor(member) {
    this.member = member;
  }
}

module.exports = ScaffoldingTemplate;
