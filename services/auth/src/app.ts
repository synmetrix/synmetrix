import fastify, {FastifyInstance} from 'fastify';

import config from './plugins/config.js';
import auth from './plugins/auth.js';
import hasuraClient from './plugins/hasura.js';
import webhookRoutes from './routes/webhooks.js';

const appFramework: () => Promise<FastifyInstance> = async () => {
  const app = fastify({ logger: true });

  app.register(config);
  app.register(hasuraClient);
  app.register(auth);
  app.register(webhookRoutes);

  await app.ready();

  return app;
}

export default appFramework;
