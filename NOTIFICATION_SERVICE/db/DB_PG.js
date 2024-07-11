const Pool = require('pg').Pool
const pool = new Pool({
  user: 'burnet',
  host: process.env.USER_DB_HOST,
  database: 'tip_be_user_service',
  password: '1234',
  port: 5432,
})

module.exports = pool;