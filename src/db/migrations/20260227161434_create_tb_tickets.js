exports.up = async function (knex) {
    await knex.schema.createTable('tb_tickets', (table) => {
        table.bigIncrements('id').primary();

        table
            .enu('type', ['register', 'login', 'reset_password'])
            .notNullable();

        table.string('phone', 30).notNullable();
        table.string('user_name', 100);

        table.string('code_hash', 255).notNullable();
        table.string('password_hash', 255).nullable();
        table.integer('attempts').unsigned().notNullable().defaultTo(0);
        table.integer('max_attempts').unsigned().notNullable().defaultTo(5);

        table.dateTime('expires_at').notNullable();

        table
            .enu('status', ['pending', 'verified', 'expired', 'consumed'])
            .notNullable()
            .defaultTo('pending');

        table
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();

        table
            .timestamp('updated_at')
            .defaultTo(knex.fn.now())
            .notNullable();

        table.index(['phone']);
        table.index(['status']);
        table.index(['expires_at']);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('tb_tickets');
};