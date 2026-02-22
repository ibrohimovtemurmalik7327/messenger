exports.up = async function(knex) {
    //tb_contacts
    await knex.schema.createTable('tb_contacts', (table) => {
        table.bigIncrements('id').primary();

        table.string('phone', 20).notNullable().unique();
        table.string('email', 150).nullable();
        table.text('address').nullable();

        table.boolean('is_active').notNullable().defaultTo(true);

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('tb_contacts');
};