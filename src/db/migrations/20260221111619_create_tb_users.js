exports.up = async function (knex) {
    await knex.schema.createTable('tb_users', (table) => {

        table.bigIncrements('id').primary();

        table.string('user_name', 100).notNullable();

        table.string('phone', 30).notNullable().unique();
        table.string('email', 191).unique();

        table.string('login', 100).unique();
        table.string('password_hash', 255).notNullable();

        table.string('first_name', 100);
        table.string('last_name', 100);

        table.integer('age').unsigned();

        table.string('avatar_url', 255);

        table.enu('role', ['user', 'admin'])
            .notNullable()
            .defaultTo('user');

        table.enu('status', ['active', 'blocked', 'pending'])
            .notNullable()
            .defaultTo('active');

        table.dateTime('email_verified_at');

        table.dateTime('last_login_at');

        table.dateTime('last_seen_at');

        table.dateTime('password_changed_at');

        table.dateTime('phone_verified_at');

        table.timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();

        table.timestamp('updated_at')
            .defaultTo(knex.fn.now())
            .notNullable();
    });
};


exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('tb_users');
};