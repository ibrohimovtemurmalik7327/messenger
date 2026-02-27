exports.up = async function (knex) {
    await knex.schema.createTable('tb_users', (table) => {
        table.bigIncrements('id').primary();

        table.string('user_name', 100).notNullable().unique();

        table.string('phone', 30).notNullable().unique();

        table.string('password_hash', 255).notNullable();

        table
            .enu('status', ['active', 'blocked', 'pending'])
            .notNullable()
            .defaultTo('active');

        table
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();

        table
            .timestamp('updated_at')
            .defaultTo(knex.fn.now())
            .notNullable();
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('tb_users');
};