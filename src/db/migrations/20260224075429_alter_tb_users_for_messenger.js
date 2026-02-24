exports.up = async function (knex) {
    await knex.schema.alterTable('tb_users', (table) => {

        table.dropColumn('first_name');
        table.dropColumn('last_name');
        table.dropColumn('age');
        table.dropColumn('email_verified_at');
        table.dropColumn('password_changed_at');

        table.renameColumn('last_login_at', 'last_seen_at');

        table.dateTime('phone_verified_at').nullable();

        table.string('login', 100).notNullable().alter();
        table.string('phone', 30).notNullable().alter();

    });
};

exports.down = async function (knex) {
    await knex.schema.alterTable('tb_users', (table) => {

        table.string('first_name', 100);
        table.string('last_name', 100);
        table.integer('age').unsigned();

        table.dateTime('email_verified_at');
        table.dateTime('password_changed_at');

        table.renameColumn('last_seen_at', 'last_login_at');

        table.dropColumn('phone_verified_at');

    });
};