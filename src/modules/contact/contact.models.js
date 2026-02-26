const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class ContactModels {
    contactCreate = async (data) => {
        const contact_meta = await db_mysql(config.tables.TB_CONTACTS).insert(data);

        return this.contactGetOne(contact_meta[0]);
    };

    contactGetAll = async (user_id) => {
        return db_mysql(config.tables.TB_CONTACTS).select('*').where({ user_id });
    };

    contactGetOne = async (id) => {
        return db_mysql(config.tables.TB_CONTACTS)
            .where({ id })
            .first();
    };

    contactUpdate = async (id, data) => {
        return db_mysql(config.tables.TB_CONTACTS)
            .where({ id })
            .update({
            ...data,
            updated_at: db_mysql.fn.now(),
        });
    };

    contactDelete = async (id) => {
        return db_mysql(config.tables.TB_CONTACTS).where({ id }).del();
    };
}

module.exports = new ContactModels();