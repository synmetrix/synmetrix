import express from 'express';
import pgfl from 'postgraphile';
import cors from 'cors';

import gqlPlayground from 'graphql-playground-middleware-express';
import PgPubsub from '@graphile/pg-pubsub';
import filterPlugin from 'postgraphile-plugin-connection-filter';

import rootResolver from './src/plugins/rootResolver';
import extendDatasource from './src/plugins/extends/extendDatasource';
import extendUsers from './src/plugins/extends/extendUsers';
import extendExploration from './src/plugins/extends/extendExploration';
import extendDataschema from './src/plugins/extends/extendDataschema';
import extendTeam from './src/plugins/extends/extendTeam';
import authorizationResolver from './src/plugins/authorizationResolver';

import lowerCaseKeys from './src/utils/lowerCaseKeys';
import { connect } from './src/utils/createRedisConnection';

const { postgraphile, makePluginHook } = pgfl;
const { default: pgPubsub } = PgPubsub;
const { default: expressPlayground } = gqlPlayground;

const app = express();
let redisClient;
(async () => { redisClient = await connect() })();

const pgConfig = process.env.CONNECTION_STRING;
const schemaName = process.env.SCHEMA || 'public';

const additionalGraphQLContextFromRequest = () => ({ redisClient });

const websocketMiddlewares = [
  (req, res, next) => {
    // that's a hack because of different headers format in connectionParams
    // this client using payload: { headers: {} }
    // https://github.com/ecthiender/py-graphql-client/blob/08f7989bf04b585a724a309e57dd2f5160a3fe0f/graphql_client/__init__.py#L149
    if (req.connectionParams && req.connectionParams.headers) {
      req.headers = lowerCaseKeys({
        ...req.headers,
        ...req.connectionParams.headers,
      });
    }

    next();
  }
];

const pluginHook = makePluginHook([pgPubsub]);

const options = {
  pluginHook,
  classicIds: true,
  appendPlugins: [
    authorizationResolver,
    filterPlugin,
    rootResolver,
    extendDatasource,
    extendUsers,
    extendExploration,
    extendDataschema,
    extendTeam,
  ],
  graphiql: true,
  jwtSecret: process.env.JWT_SECRET,
  jwtPgTypeIdentifier: 'public.jwt_token',
  retryOnInitFail: true,
  jwtVerifyOptions: {
    audience: null,
  },
  pgDefaultRole: 'auth_anonymous',
  dynamicJson: true,
  subscriptions: true,
  bodySizeLimit: '100MB', // local body size limit. nginx has different
  additionalGraphQLContextFromRequest,
  websocketMiddlewares,
};

const postgraphileMw = postgraphile(pgConfig, schemaName, options);
const { pgPool } = postgraphileMw;


app.use(cors());
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
app.use(postgraphileMw);

app.listen(process.env.PORT || 5000);
