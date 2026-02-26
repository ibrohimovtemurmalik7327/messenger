exports.up = async function (knex) {
    // tb_messages
    await knex.schema.createTable('tb_messages', (table) => {
        table.bigIncrements('id').primary();

        table
            .bigInteger('from_user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tb_users')
            .onDelete('CASCADE');

        table
            .bigInteger('to_user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tb_users')
            .onDelete('CASCADE');

        table.text('message').notNullable();

        table.boolean('is_read').notNullable().defaultTo(false);

        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('tb_messages');
};