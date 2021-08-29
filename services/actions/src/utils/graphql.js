import fetch from 'node-fetch';

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const fetchGraphQL = async (query, variables) => {
  const result = await fetch(
    HASURA_ENDPOINT,
    {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables
      }),
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    }
  );

  return await result.json();
}

export default { fetchGraphQL };
