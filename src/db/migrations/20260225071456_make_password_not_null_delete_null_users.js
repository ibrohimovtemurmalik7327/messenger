exports.up = async function (knex) {

    await knex('tb_users')
        .whereNull('password_hash')
        .del();

    await knex.schema.alterTable('tb_users', (table) => {
        table.string('password_hash', 255).notNullable().alter();
    });

};

exports.down = async function (knex) {

    await knex.schema.alterTable('tb_users', (table) => {
        table.string('password_hash', 255).nullable().alter();
    });

};