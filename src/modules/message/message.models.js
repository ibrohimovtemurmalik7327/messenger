const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class MessageModels {
    messageCreate = async(data) => {
        const message_meta = await db_mysql(config.tables.TB_MESSAGES).insert(data);

        return this.messageGetOne(message_meta[0]);
    };

    messageGetAll = async(user_id) => {
        return db_mysql(config.tables.TB_MESSAGES)
            .select('*')
            .where('from_user_id', user_id)
            .orWhere('to_user_id', user_id);
    };

    messageGetOne = async(id) => {
        return db_mysql(config.tables.TB_MESSAGES)
            .select('*')
            .where({ id })
            .first();
    };

    messageUpdate = async(id, data) => {
        return db_mysql(config.tables.TB_MESSAGES)
            .where({ id })
            .update({
                ...data,
                updated_at: db_mysql.fn.now(),
            });
    };

    messageDelete = async(id) => {
        return db_mysql(config.tables.TB_MESSAGES).where({ id }).del();
    };
}

module.exports = new MessageModels();