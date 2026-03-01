const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class AuthModels {
    createRegisterTicket = async (data) => {
        const meta = await db_mysql(config.tables.TB_TICKETS).insert(data);
        const id = Array.isArray(meta) ? meta[0] : meta;
        return this.getTicketById(id);
    };

    getTicketById = async (id) => {
        return db_mysql(config.tables.TB_TICKETS)
            .where({ id })
            .first();
    };

    incrementAttempts = async (id) => {
        return db_mysql(config.tables.TB_TICKETS)
            .where({ id, status: 'pending' })
            .update({
                attempts: db_mysql.raw('attempts + 1'),
                updated_at: db_mysql.fn.now(),
            });
    };

    consumeTicket = async (id) => {
        return db_mysql(config.tables.TB_TICKETS)
            .where({ id, status: 'pending' })
            .andWhere('expires_at', '>', db_mysql.fn.now())
            .update({
                status: 'consumed',
                updated_at: db_mysql.fn.now(),
            });
    };

    expireTicket = async (id) => {
        return db_mysql(config.tables.TB_TICKETS)
            .where({ id })
            .update({
                status: 'expired',
                updated_at: db_mysql.fn.now(),
            });
    };

    getActiveTicketByPhone = async (type, phone) => {
        return db_mysql(config.tables.TB_TICKETS)
            .where({ type, phone, status: 'pending' })
            .andWhere('expires_at', '>', db_mysql.fn.now())
            .orderBy('id', 'desc')
            .first();
    };

    findByPhone = async (phone) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ phone })
            .first();
    };

    findByUserName = async (user_name) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ user_name })
            .first();
    };
}

module.exports = new AuthModels();