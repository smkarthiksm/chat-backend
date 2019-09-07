import mysql from 'mysql2/promise';

import * as Secrets from '../constants/Secrets';
import * as DatabaseConstants from '../constants/DatabaseConstants';
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: Secrets.DB_USERNAME,
  password: Secrets.DB_PASSWORD,
  database: DatabaseConstants.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;