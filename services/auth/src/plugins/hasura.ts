import fastifyPlugin from 'fastify-plugin';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import {GraphQLClient} from 'graphql-request';

async function graphqlClientPlugin(app: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error | undefined) => void) {
  app.decorate('hasura', new GraphQLClient(app.config.HASURA_ENDPOINT, {
    headers: {
      'x-hasura-admin-secret': app.config.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  }));
  done();
}


export default fastifyPlugin(graphqlClientPlugin);
