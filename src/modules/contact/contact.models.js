const db_mysql = require('../../db/connection');
const config = require('../../config/config');

class ContactModels {
    contactCreate = async (data) => {
        const contact_meta = await db_mysql(config.tables.TB_CONTACTS).insert(data);

        return this.contactGetOne(contact_meta[0]);
    };

    contactGetAll = async (owner_id) => {
        return db_mysql(`${config.tables.TB_CONTACTS} as c`)
            .leftJoin(
                `${config.tables.TB_USERS} as u`,
                'c.user_id',
                'u.id'
            )
            .select(
                'c.user_id',
                'u.user_name',
                'u.email'
            )
            .where('c.owner_id', owner_id);
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