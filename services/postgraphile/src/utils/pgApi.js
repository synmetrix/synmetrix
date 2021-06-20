import pg from 'pg';
import { gen } from './nameHelpers';

const { Pool } = pg;
const normalizeName = name => name.replace('.', '_');

export const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  max: 30,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000,
});

const pgPoolConnect = async () => {
  const pgClient = await pool.connect();

  return {
    pool,
    pgClient,
  };
};

const createSavePoint = async (pgClient, name) => {
  if (!pgClient) {
    throw new Error('no pgClient');
  }

  if (!name) {
    return false;
  }

  await pgClient.query(`SAVEPOINT ${normalizeName(name)}`);

  return name;
};

const rollbackSavePoint = async (pgClient, name) => {
  if (!pgClient) {
    throw new Error('no pgClient');
  }

  if (!name) {
    return false;
  }

  await pgClient.query(`ROLLBACK TO SAVEPOINT ${normalizeName(name)}`);
};

const releaseSavePoint = async (pgClient, name) => {
  if (!pgClient) {
    throw new Error('no pgClient');
  }

  if (!name) {
    return false;
  }

  await pgClient.query(`RELEASE SAVEPOINT ${normalizeName(name)}`);
};

const begin = async (pgClient) => {
  await pgClient.query('BEGIN;');
};

const commit = async (pgClient) => {
  await pgClient.query('COMMIT;');
};

const runQuery = async (pgClient, savePointName, rawSql, values) => {
  await begin(pgClient);
  await createSavePoint(pgClient, savePointName);

  try {
    const result = await pgClient.query(rawSql, [...values]);
    return result;
  } catch (e) {
    console.error(e);
    await rollbackSavePoint(pgClient, savePointName);
  } finally {
    await releaseSavePoint(pgClient, savePointName);
    await commit(pgClient);
  }

  return false;
};

const createRow = async (pgClient, table, data, options = {}) => {
  const { savePoint = true, valuesPlaceholder } = options;

  const keys = Object.keys(data);
  const valuesPlaceholders = valuesPlaceholder || keys.map((_, index) => `$${index + 1}`);
  const values = Object.values(data);

  const rawSql = `INSERT INTO ${table} (${keys}) VALUES (${valuesPlaceholders}) RETURNING *;`;

  const savePointName = null;
  // if (savePoint) {
  //   savePointName = `${table}_${gen(4)}`;
  // }

  const res = await runQuery(pgClient, savePointName, rawSql, values);
  return res;
};

const updateRowById = async (pgClient, table, id, data, options = {}) => {
  const { savePoint = true, valuesPlaceholder } = options;

  const keys = Object.keys(data);
  const keysAndId = [...keys, id];

  const valuesPlaceholders = keysAndId.map((_, index) => `$${index + 1}`);
  const values = [...Object.values(data), id];

  const sets = [];
  keys.forEach((key, index) => {
    sets.push(`"${key}" = ${valuesPlaceholder || valuesPlaceholders[index]}`);
  });

  let rawSql = `UPDATE ${table}`; 
  rawSql = rawSql.concat(` SET ${sets.join(', ')}`);
  rawSql = rawSql.concat(` WHERE id = ${valuesPlaceholders[valuesPlaceholders.length - 1]}`);
  rawSql = rawSql.concat(` RETURNING *;`);

  const savePointName = null;
  // if (savePoint) {
  //   savePointName = `${table}_${id}_${gen(4)}`;
  // }

  const res = await runQuery(pgClient, savePointName, rawSql, values);
  return res;
};

const deleteRowById = async (pgClient, table, id) => {
  const savePointName = null;
  let rawSql = `DELETE FROM ${table}`; 
  rawSql = rawSql.concat(` WHERE id = $1`);
  rawSql = rawSql.concat(` RETURNING *;`);

  const res = await runQuery(pgClient, savePointName, rawSql, [id]);
  return res;
};

export { 
  pgPoolConnect,
  begin,
  commit,
  updateRowById,
  createRow,
  deleteRowById,
  createSavePoint,
  releaseSavePoint,
  rollbackSavePoint
};
