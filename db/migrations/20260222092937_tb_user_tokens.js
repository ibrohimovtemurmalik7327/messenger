exports.up = async function(knex) {
    //tb_user_tokens

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

exports.down = async function(knex) {
    await knex.schema.dropTable('tb_user_tokens');
};

