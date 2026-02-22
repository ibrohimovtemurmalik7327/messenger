const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class UserModels {
    userCreate = async (data) => {
        const user_meta = await db_mysql(config.tables.TB_USERS).insert(data);

        // return {success: true, data: user_meta};
        return this.userGetOne(user_meta[0]);
    }

    userGetOne = async (id) => {
        return db_mysql(config.tables.TB_USERS).select('*').where('id', id).first();
    }
}

module.exports = new UserModels();