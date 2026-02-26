exports.up = async function(knex) {
    await knex.schema.createTable('tb_contacts', (table) => {

        table.bigIncrements('id').primary();

        table.bigInteger('owner_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tb_users')
            .onDelete('CASCADE');

        table.bigInteger('user_id')
            .unsigned()
            .references('id')
            .inTable('tb_users')
            .onDelete('SET NULL');


        table.string('phone', 20);
        table.string('email', 150);

        table.text('address');

        table.boolean('is_active')
            .notNullable()
            .defaultTo(true);

        table.timestamp('created_at')
            .defaultTo(knex.fn.now());

        table.timestamp('updated_at')
            .defaultTo(knex.fn.now());

        table.unique(['owner_id', 'user_id']);
    });
};


exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('tb_contacts');
};