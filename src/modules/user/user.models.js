const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class UserModels {
    userCreate = async (data) => {
        const user_meta = await db_mysql(config.tables.TB_USERS).insert(data);

        // return {success: true, data: user_meta};
        return this.userGetOne(user_meta[0]);
    };

    userGetAll = async () => {
        return db_mysql(config.tables.TB_USERS).select('*');
    };

    userGetOne = async (id) => {
        return db_mysql(config.tables.TB_USERS).select('*').where({id: id}).first();
    };

    userUpdate = async (id, data) => {
        return db_mysql(config.tables.TB_USERS)
            .where('id', id)
            .update({
                ...data,
                updated_at: db_mysql.fn.now(),
            });
    };

    userDelete = async (id) => {
        return db_mysql(config.tables.TB_USERS)
            .where({id})
            .del();
    };
}

module.exports = new UserModels();