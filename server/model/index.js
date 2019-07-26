const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const db = {};
const opts = {
  dialectOptions: {
    multipleStatements: true
  }
};

opts.logging = env === 'test' ? false : undefined;
const sequelize = new Sequelize(config.url, opts);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.sql');
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
