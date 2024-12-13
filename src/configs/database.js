const { Pool } = require('pg');
const config = require('../utils/config');

class Database {
  constructor() {
    try {
      this._pool = new Pool({
        host: config.database.host,
        port: config.database.port,
        database: config.database.databaseName,
        user: process.env.user,
        password: config.database.password,
      });

      this._pool
        .connect()
        .then((client) => {
          console.log('Database connection success');
          client.release();
        })
        .catch((error) => {
          console.error('Database connection failed:', error.message);
          throw error;
        });
    } catch (error) {
      console.error('Failed to initialize the database pool:', error.message);
      throw error;
    }
  }

  query(...args) {
    return this._pool.query(...args);
  }

  connect() {
    return this._pool.connect();
  }
}

module.exports = new Database();
