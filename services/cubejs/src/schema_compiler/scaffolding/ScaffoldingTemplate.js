import DefaultScaffoldingTemplate from '@cubejs-backend/schema-compiler/scaffolding/ScaffoldingTemplate.js';
import { ValueWithComments } from '@cubejs-backend/schema-compiler/dist/src/scaffolding/ValueWithComments.js';
import fromPairs from '../../utils/fromPairs.js';

const GRANULARITY_ARRAY = [
  'day',
  'week',
  'hour',
  'month',
  'year',
  'minute',
  'second',
];

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
};

class ScaffoldingTemplate extends DefaultScaffoldingTemplate {
  schemaDescriptorForTable(tableSchema, schemaContext = {}) {
    const { dialect } = schemaContext;

    const dimensions = tableSchema.dimensions.reduce((mem, dim) => {
      const res = {};
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

      // TODO: add dialect to round numbers
      // if (type === 'number') {
      //   fieldObject.sql = `round(CAST(\${TABLE}.${fieldObject.sql} AS NUMERIC), 6)`;
      // }

      const dimensionName = this.memberName(dim);
      res[dimensionName] = fieldObject;

      if (type === 'time') {
        const granTime = GRANULARITY_ARRAY.forEach(gran => {
          const timeDimensionName = dimensionName + capitalize(gran);

          const timeFieldObject = {
            title: `${dimensionName} [${gran}]`,
            sql: dialect.timeGroupedColumn(gran, dimensionName),
            type,
          };

          res[timeDimensionName] = timeFieldObject;
        });
      }

      return {
        ...mem,
        ...res,
      };
    }, {});

    const joins = tableSchema.joins.map(j => ([
      j.cubeToJoin,
      {
        sql: `\${CUBE}.${this.escapeName(j.thisTableColumn)} = \${${j.cubeToJoin}}.${this.escapeName(j.columnToJoin)}`,
        relationship: j.relationship
      }
    ]));

    const measures = tableSchema.measures.map(m => ([
      this.memberName(m),
      {
        sql: this.sqlForMember(m),
        type: m.types[0],
        title: this.memberTitle(m)
      }
    ]));

    return {
      cube: tableSchema.cube,
      sql: `SELECT * FROM ${this.escapeName(tableSchema.schema)}.${this.escapeName(tableSchema.table)}`, // TODO escape
      preAggregations: new ValueWithComments({}, [
        'Pre-Aggregations definitions go here',
        'Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started'
      ]),
      joins: fromPairs(joins),
      measures: {
        count: {
          type: 'count',
        },
        ...fromPairs(measures),
      },
      dimensions,
    };
  }
};

export default ScaffoldingTemplate;
