exports.up = async function (knex) {
    // tb_users
    await knex.schema.createTable('tb_users', (table) => {
        table.bigIncrements('id').primary();

        table.string('login', 100).notNullable().unique();
        table.string('email', 191).unique();
        table.string('phone', 30).unique();

        table.string('password_hash', 255).notNullable();
        table.string('user_name', 100).notNullable();

        table.string('first_name', 100);
        table.string('last_name', 100);
        table.integer('age').unsigned();
        table.string('avatar_url', 255);

        table.enu('role', ['user', 'admin']).notNullable().defaultTo('user');
        table.enu('status', ['active', 'blocked', 'pending']).notNullable().defaultTo('active');

        table.dateTime('email_verified_at');
        table.dateTime('last_login_at');
        table.dateTime('password_changed_at');

        table.timestamps(true, true); // created_at, updated_at
    });

    // tb_user_tokens
    await knex.schema.createTable('tb_user_tokens', (table) => {
        table.bigIncrements('id').primary();

        table
            .bigInteger('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tb_users')
            .onDelete('CASCADE');

        table.enu('token_type', ['refresh', 'access']).notNullable().defaultTo('refresh');

        table.string('token_hash', 255).notNullable();
        table.dateTime('expires_at').notNullable();
        table.dateTime('revoked_at');

        table.string('user_agent', 255);
        table.string('ip_address', 45);

        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.index('user_id');
        table.index('expires_at');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('tb_user_tokens');
    await knex.schema.dropTableIfExists('tb_users');
};