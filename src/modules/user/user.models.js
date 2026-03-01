const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class UserModels {
    getExistingIds = async (ids) => {
        const uniqueIds = [...new Set(ids)].filter((x) => Number.isInteger(x) && x > 0);
        if (uniqueIds.length === 0) return [];

        const rows = await db_mysql(config.tables.TB_USERS)
            .select('id')
            .whereIn('id', uniqueIds);

        return rows.map(r => r.id);
    };

    findByUserName = async (user_name) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ user_name })
            .first();
    };

    existsByPhone = async (phone) => {
        const row = await db_mysql(config.tables.TB_USERS)
            .select('id')
            .where({ phone })
            .first();
        return !!row;
    };

    existsByUserName = async (user_name) => {
        const row = await db_mysql(config.tables.TB_USERS)
            .select('id')
            .where({ user_name })
            .first();
        return !!row;
    };

    findByPhone = async (phone) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ phone })
            .first();
    };

    userCreate = async (data) => {
        const meta = await db_mysql(config.tables.TB_USERS).insert(data);
        const id = Array.isArray(meta) ? meta[0] : meta;
        return this.userGetOne(id);
    };

    userGetAll = async () => {
        return db_mysql(config.tables.TB_USERS).select('*');
    };

    userGetOne = async (id) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ id })
            .first();
    };

    userUpdate = async (id, data) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ id })
            .update({
                ...data,
                updated_at: db_mysql.fn.now(),
            });
    };

    userDelete = async (id) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ id })
            .del();
    };

    userChangePassword = async (id, hashedPassword) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ id })
            .update({
                password_hash: hashedPassword,
                updated_at: db_mysql.fn.now(),
            });
    };

    getPasswordHashById = async (id) => {
        const row = await db_mysql(config.tables.TB_USERS)
            .select('password_hash')
            .where({ id })
            .first();

        return row?.password_hash;
    };
}

module.exports = new UserModels();