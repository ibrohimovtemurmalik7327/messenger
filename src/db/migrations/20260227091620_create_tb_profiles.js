exports.up = async (knex) => {
    await knex.schema.createTable('tb_profiles', (table) => {
        table.bigInteger('user_id').unsigned().primary();

        table.string('first_name', 100);
        table.string('last_name', 100);
        table.string('avatar_url', 255);

        table
            .foreign('user_id')
            .references('id')
            .inTable('tb_users')
            .onDelete('CASCADE');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('tb_profiles');
};