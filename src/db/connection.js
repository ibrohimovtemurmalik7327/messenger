const knex = require('knex');
const knexConfig = require('./knexfile');

const db_mysql = knex(knexConfig.development);

module.exports = db_mysql;