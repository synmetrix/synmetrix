import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword/index.js';

import { createAccountWithUserMutation, createAccountMutation, getAccountByMetaQuery } from '../api/Account.js';


interface WebhookEvent {
  data: {
    new: any;
    old: any;
  };
  session_variables: any;
  trace_context: {
    sampling_state: string;
    span_id: string;
    trace_id: string;
  };
}

interface WebhookPayload {
  created_at: string;
  delivery_info: {
    current_retry: number;
    max_retries: number;
  };
  event: WebhookEvent;
  id: string;
  table: {
    name: string;
    schema: string;
  };
  trigger: {
    name: string;
  };
}

const webhooks = async (app: FastifyInstance) => {
  app.post('/webhooks/addAccount', async (
    request: FastifyRequest<{ Body: WebhookPayload }>,
    reply: FastifyReply
  ) => {
    const { recipe_id: recipe, user_id: serviceUserId } = request.body?.event?.data?.new;
    let email: string | undefined = '';

    switch (recipe) {
      case 'emailpassword':
        const user = await ThirdPartyEmailPassword.getUserById(serviceUserId);
        email = user?.email;

        if (!email) {
          reply.send({
            status: 'error',
            message: 'Email not found in service "supertokens"'
          });
          return reply;
        }

        break;
      default:
        break;
    }

    const accountResponse: any = await app.hasura.request(getAccountByMetaQuery, { email, service: 'supertokens' });
    const { user_id: accountUserId } = accountResponse?.accounts?.[0] || {};

    const meta = {
      provider: 'emailpassword',
      service: 'supertokens',
      email
    };
    
    if (accountUserId) {
      await app.hasura.request(createAccountMutation, { external_id: serviceUserId, user_id: accountUserId, meta });
    } else {
      await app.hasura.request(createAccountWithUserMutation, { external_id: serviceUserId, meta });
    }

    reply.send({
      status: 'ok'
    });

    return reply;
  })
};

export default fastifyPlugin(webhooks);
