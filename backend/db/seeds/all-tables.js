exports.seed = async function(knex, Promise) {
  await knex('users').del();
  await Promise.all (
    [
      knex('users').insert({name: 'Alice', password: 'alice', email: 'alice@alice.com'}),
      knex('users').insert({name: 'Bob', password: 'bob', email: 'bob@bob.com'}),
      knex('users').insert({name: 'Mark', password: 'mark', email: 'mark@mark.com'}),
    ]
  );

  await knex('robots').del();
  await Promise.all (
    [
      knex('robots').insert({name: 'Robot1', user_id: 1, img_url: "https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn'], active: true}),
      knex('robots').insert({name: 'Robot2', user_id: 2, img_url: "https://66.media.tumblr.com/4f8896ebca88bb0d8308607315d085c9/tumblr_n439wbdHxA1sulisxo1_400.gif",remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn'], active: true}),
      knex('robots').insert({name: 'Robot3', user_id: 3, img_url: "https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif",remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn'], active: true}),
    ]
  );

  await knex('battle_results').del();
  await Promise.all (
    [
      knex('battle_results').insert({winner_id: 1}),
      knex('battle_results').insert({winner_id: 2}),
      knex('battle_results').insert({winner_id: 3}),
    ]
  );

  await knex('robots_battles').del();
  await Promise.all (
    [
      knex('robots_battles').insert({battle_id: 1, robot_id: 1}),
      knex('robots_battles').insert({battle_id: 1, robot_id: 2}),
      knex('robots_battles').insert({battle_id: 2, robot_id: 2}),
      knex('robots_battles').insert({battle_id: 2, robot_id: 3}),
      knex('robots_battles').insert({battle_id: 3, robot_id: 3}),
      knex('robots_battles').insert({battle_id: 3, robot_id: 1}),
    ]
  );
  
};
