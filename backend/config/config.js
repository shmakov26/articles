require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'articles_db',
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 3000,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME + '_test' || 'articles_db_test',
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 3000,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'articles_db',
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 3000,
    dialect: 'postgres'
  }
}
