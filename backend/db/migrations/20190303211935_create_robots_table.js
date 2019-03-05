
exports.up = function(knex, Promise) {
  return knex.schema.createTable('robots', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.integer('user_id').references('id').on('users');
    table.integer('hp');
    table.integer('str');
    table.integer('dex');
    table.integer('arm');
    table.boolean('active');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('robots');
};
