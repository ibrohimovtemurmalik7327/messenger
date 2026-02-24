exports.up = async function (knex) {
    await knex.schema.alterTable('tb_users', (table) => {
        table.string('login', 100).nullable().alter();
        table.string('password_hash', 255).nullable().alter();
    });
};

exports.down = async function (knex) {
    await knex.schema.alterTable('tb_users', (table) => {
        table.string('login', 100).notNullable().alter();
        table.string('password_hash', 255).notNullable().alter();
    });
};