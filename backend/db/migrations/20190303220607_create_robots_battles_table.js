
exports.up = function(knex, Promise) {
  return knex.schema.createTable('robots_battles', function (table) {
    table.increments('id').primary();
    table.integer('battle_id').references('id').on('battle_results');
    table.integer('robot_id').references('id').on('robots');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('robots_battles');
};
