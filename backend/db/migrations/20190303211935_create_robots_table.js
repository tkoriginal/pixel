exports.up = function(knex, Promise) {
  return knex.schema.createTable("robots", function(table) {
    table.increments("id").primary();
    table.string("name");
    table.string("img_url");
    table
      .integer("user_id")
      .references("id")
      .on("users");
    table.integer("remainingStats");
    table.integer("health");
    table.integer("strength");
    table.integer("dexterity");
    table.integer("armour");
    table.specificType("traits", "text[]");
    table.boolean("active");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("robots");
};
