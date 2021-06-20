const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  max: 50,
  // connectionTimeoutMillis: 1000,
  // idleTimeoutMillis: 1000,
});

module.exports = pool;
