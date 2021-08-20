import graphileUtils from 'graphile-utils';
import { currentUserTopicFromContext } from '../helpers.js';

const { makeExtendSchemaPlugin, gql, embed } = graphileUtils;

export default makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      type DashboardSubscriptionPayload {
        dashboard: Dashboard
      }

      extend type Subscription {
        dashboardUpdated: DashboardSubscriptionPayload @pgSubscription(
          topic: ${embed(
            (args, context) =>
              currentUserTopicFromContext({ ...args, channelKey: 'dashboardUpdated'}, context)
          )
        })
      }
    `,
    resolvers: {
      DashboardSubscriptionPayload: {
        async dashboard(event, _args, _context, { graphile: { selectGraphQLResultFromTable } }) {
          const { pgSql } = build;

          const rows = await selectGraphQLResultFromTable(
            pgSql.fragment`public.dashboards`,
            (_tableAlias, sqlBuilder) => {
              sqlBuilder.where(
                pgSql.fragment`${sqlBuilder.getTableAlias()}.id = ${pgSql.value(event.id)}`
              );
            }
          );

          return rows[0];
        },
      }
    },
  };
});
