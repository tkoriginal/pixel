
exports.up = function(knex, Promise) {
  return knex.schema.createTable('battle_results', function (table) {
    table.increments('id').primary();
    table.integer('winner_id').references('id').on('robots');
    table.json('battle_log');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('battle_results');
};
