const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'routeapp',
  password: process.env.DB_PASSWORD || 'routeapp_password',
  database: process.env.DB_NAME || 'routeapp_db',
});

pool.on('connect', () => {
  console.log('✅ Connecté à la base de données PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erreur de connexion à la base de données:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
