const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env'),
});

const config = {
    env: process.env.NODE_ENV || 'development',

    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3307),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'db_messenger',
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'supersecret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },

    server: {
        port: Number(process.env.PORT || 3000),
    },

    tables: {
        TB_USERS: 'tb_users',
    },
};

module.exports = config;