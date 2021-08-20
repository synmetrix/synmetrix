const GOOGLE_OAUTH_ID = process.env.GOOGLE_OAUTH_ID;

const getOAuthUrl = ({ scope, state, redirectUri }) => {
  return [
    'https://accounts.google.com/o/oauth2/auth?',
    `client_id=${GOOGLE_OAUTH_ID}&`,
    'response_type=code&',
    `redirect_uri=${redirectUri}&`,
    `scope=${scope}&`,
    `state=${state}`
  ].join('');
}

export { getOAuthUrl }
