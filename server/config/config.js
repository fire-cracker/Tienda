const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: 'mysql'
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'mysql'
  },
  production: {
    url: process.env.CLEARDB_DATABASE_URL,
    dialect: 'mysql'
  }
};
