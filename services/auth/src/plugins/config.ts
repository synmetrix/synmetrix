import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyEnv from '@fastify/env';
import fastifyPlugin from 'fastify-plugin';
import {GraphQLClient} from "graphql-request";

declare module 'fastify' {
  interface FastifyInstance {
    hasura: GraphQLClient,
    config: {
      HTTP_PORT: number,
      HTTP_HOST: string,
      SUPERTOKENS_CONNECTION_URI: string,
      SUPERTOKENS_API_DOMAIN: string,
      SUPERTOKENS_FRONTEND_DOMAIN: string,
      SUPERTOKENS_GOOGLE_CLIENT_ID: string,
      SUPERTOKENS_GOOGLE_CLIENT_SECRET: string,
      SUPERTOKENS_GITHUB_CLIENT_ID: string,
      SUPERTOKENS_GITHUB_CLIENT_SECRET: string,
      CORS_ORIGIN_URL: string,
      HASURA_ENDPOINT: string,
      HASURA_GRAPHQL_ADMIN_SECRET: string,
    };
  }
}

const configPlugin = async (app: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error | undefined) => void) => {
  const schema = {
    type: 'object',
    required: [
      'SUPERTOKENS_CONNECTION_URI',
      'SUPERTOKENS_API_DOMAIN',
      'SUPERTOKENS_FRONTEND_DOMAIN',
      'CORS_ORIGIN_URL',
      'HASURA_ENDPOINT',
      'HASURA_GRAPHQL_ADMIN_SECRET',
    ],
    properties: {
      HTTP_PORT: {
        type: 'number',
        default: 4000,
      },
      HTTP_HOST: {
        type: 'string',
        default: '0.0.0.0',
      },
      SUPERTOKENS_CONNECTION_URI: {
        type: 'string',
      },
      SUPERTOKENS_API_DOMAIN: {
        type: 'string',
      },
      SUPERTOKENS_FRONTEND_DOMAIN: {
        type: 'string',
      },
      SUPERTOKENS_GOOGLE_CLIENT_ID: {
        type: 'string',
      },
      SUPERTOKENS_GOOGLE_CLIENT_SECRET: {
        type: 'string',
      },
      SUPERTOKENS_GITHUB_CLIENT_ID: {
        type: 'string',
      },
      SUPERTOKENS_GITHUB_CLIENT_SECRET: {
        type: 'string',
      },
      CORS_ORIGIN_URL: {
        type: 'string',
      },
      HASURA_ENDPOINT: {
        type: 'string'
      },
      HASURA_GRAPHQL_ADMIN_SECRET: {
        type: 'string'
      },
    },
  };

  const configOptions = {
    confKey: 'config',
    schema: schema,
    data: process.env,
    dotenv: {
      path: `${process.cwd()}/.env.${process.env.NODE_ENV}`
    },
    removeAdditional: true,
  };

  return fastifyEnv(app, configOptions, done);
}

export default fastifyPlugin(configPlugin);
