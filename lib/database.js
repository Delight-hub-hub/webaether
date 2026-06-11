const { Pool } = require('pg');

let pool;

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString =
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.SUPABASE_DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error('Set DATABASE_URL, POSTGRES_URL, or SUPABASE_DATABASE_URL.');
  }

  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  pool.on('error', (error) => {
    console.error('Unexpected PostgreSQL pool error', error);
  });

  return pool;
}

async function query(text, params) {
  return getPool().query(text, params);
}

module.exports = { query };
