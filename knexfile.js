const config = require('./config/config');

module.exports = {
    development: {
        client: 'mysql2',
        connection: config.db,
        migrations: {
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
    },

    production: {
        client: 'mysql2',
        connection: {
            ...config.db,
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
    },
};