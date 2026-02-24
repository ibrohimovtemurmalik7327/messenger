const path = require('path');
const config = require('../config/config');

module.exports = {
    development: {
        client: 'mysql2',
        connection: config.db,
        migrations: {
            directory: path.join(__dirname, 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'seeds'),
        },
        pool: { min: 2, max: 5 },
    },

    production: {
        client: 'mysql2',
        connection: { ...config.db, ssl: { rejectUnauthorized: false } },
        migrations: {
            directory: path.join(__dirname, 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'seeds'),
        },
        pool: { min: 2, max: 5 },
    },
};