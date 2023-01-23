import fetch from 'node-fetch';

export default async (session, input, headers) => {
  const { delivery_type: deliveryType, exploration_id, ...deliveryConfig } = input || {};

  // TODO switch by deliveryType and load exploration
  try {
    const result = await fetch(
      webhook,
      {
        method: 'POST',
        body: JSON.stringify({}),
        headers,
      }
    );
  } catch (err) {
    return apiError(err);
  }

  return result;
};
