const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class UserModels {

    findByPhone = async (phone) => {
        return db_mysql(config.tables.TB_USERS)
            .where({ phone })
            .first();
    };

    userCreate = async (data) => {
        const user_meta = await db_mysql(config.tables.TB_USERS).insert(data);

        return this.userGetOne(user_meta[0]);
    };

    userGetAll = async () => {
        return db_mysql(config.tables.TB_USERS).select('*');
    };

    userGetOne = async (id) => {
        return db_mysql(config.tables.TB_USERS)
            .where({id})
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