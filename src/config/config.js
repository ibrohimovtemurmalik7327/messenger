const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const must = (name) => {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
};

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
        secret: must('JWT_SECRET'),
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },

    server: {
        port: Number(process.env.PORT || 3000),
    },

    tables: {
        TB_USERS: 'tb_users',
        TB_CONTACTS: 'tb_contacts',
        TB_MESSAGES: 'tb_messages',
        TB_PROFILES: 'tb_profiles',
        TB_TICKETS: 'tb_tickets',
    },

    auth: {
        otp_length: Number(process.env.AUTH_OTP_LENGTH) || 6,
        otp_ttl_ms: Number(process.env.AUTH_OTP_TTL_MS) || 5 * 60 * 1000,
        bcrypt_cost: Number(process.env.AUTH_BCRYPT_COST) || 10,
        otp_max_attempts: Number(process.env.AUTH_OTP_MAX_ATTEMPTS) || 5,
    },
};

module.exports = config;