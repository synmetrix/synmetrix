const { N8N_BASIC_AUTH } = process.env;

const getBasicAuthHeaders = () => ({
  'Authorization': `Basic ${new Buffer(N8N_BASIC_AUTH).toString('base64')}`
})

export default getBasicAuthHeaders;
