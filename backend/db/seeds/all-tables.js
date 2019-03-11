exports.seed = async function(knex, Promise) {
  await knex('users').del();
  await Promise.all (
    [
      knex('users').insert({name: 'Alice', password: 'alice', email: 'alice@alice.com'}),
      knex('users').insert({name: 'Bob', password: 'bob', email: 'bob@bob.com'}),
      knex('users').insert({name: 'Mark', password: 'mark', email: 'mark@mark.com'}),
      knex('users').insert({name: 'Max', password: 'max', email: 'max@max.com'}),
      knex('users').insert({name: 'Greg', password: 'greg', email: 'greg@greg.com'}),
      knex('users').insert({name: 'tk', password: 'tk', email: 'tk@tk.com'}),
    ]
  );

  await knex('robots').del();
  await Promise.all (
    [
      knex('robots').insert({name: 'Sally', user_id: 1, img_url: "img/robot1.gif", remainingStats: 5, health: 100, strength: 15, dexterity: 12, armour: 8, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'thorns'], active: true}),
      knex('robots').insert({name: 'Bumper', user_id: 1, img_url: "img/robot2.gif", remainingStats: 0, health: 100, strength: 5, dexterity: 10, armour: 10, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'critical'], active: true}),
      knex('robots').insert({name: 'Sweepy', user_id: 1, img_url: "img/robot3.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 15, armour: 10, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'block'], active: true}),
      knex('robots').insert({name: 'Tk01', user_id: 2, img_url: "img/robot4.gif", remainingStats: 0, health: 75, strength: 14, dexterity: 11, armour: 10, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'thorns'], active: true}),
      knex('robots').insert({name: 'Bobby', user_id: 2, img_url: "img/robot5.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 10, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'poison'], active: true}),
      knex('robots').insert({name: 'Flare', user_id: 2, img_url: "img/robot6.gif", remainingStats: 0, health: 65, strength: 17, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'doubleDamage'], active: true}),
      knex('robots').insert({name: 'Flexo', user_id: 3, img_url: "img/robot7.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'block'], active: true}),
      knex('robots').insert({name: 'Bender', user_id: 3, img_url: "img/robot8.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'critical'], active: true}),
      knex('robots').insert({name: 'RockJaw', user_id: 3, img_url: "img/robot9.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'critical'], active: true}),
      knex('robots').insert({name: 'Blamo', user_id: 4, img_url: "img/robot10.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'block'], active: true}),
      knex('robots').insert({name: 'R3', user_id: 4, img_url: "img/robot11.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'block'], active: true}),
      knex('robots').insert({name: 'C4-K0', user_id: 5, img_url: "img/robot12.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'critical'], active: true}),
      knex('robots').insert({name: 'Art2-Brut', user_id: 5, img_url: "img/robot13.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'doubleDamage'], active: true}),
      knex('robots').insert({name: 'Floop', user_id: 5, img_url: "img/robot14.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'critical'], active: true}),
      knex('robots').insert({name: 'Clamps', user_id: 6, img_url: "img/robot15.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'block'], active: true}),
      knex('robots').insert({name: 'Rickshaw', user_id: 6, img_url: "img/robot16.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'poison'], active: true}),
      knex('robots').insert({name: 'Zero', user_id: 6, img_url: "img/robot17.gif", remainingStats: 0, health: 75, strength: 10, dexterity: 10, armour: 5, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'critical'], active: true}),
      knex('robots').insert({name: 'Trunks', user_id: 6, img_url: "img/robot18.gif", remainingStats: 0, health: 150, strength: 7, dexterity: 2, armour: 4, traits: ['attack', 'defend', 'assignDamage', 'changeTurn', 'block'], active: true}),
    ]
  );

  await knex('battle_results').del();
  await Promise.all (
    [
      knex('battle_results').insert({winner_id: 1}),
      knex('battle_results').insert({winner_id: 2}),
      knex('battle_results').insert({winner_id: 3}),
      knex('battle_results').insert({winner_id: 1}),
      knex('battle_results').insert({winner_id: 2}),
      knex('battle_results').insert({winner_id: 3}),
      knex('battle_results').insert({winner_id: 1}),
      knex('battle_results').insert({winner_id: 1}),
      knex('battle_results').insert({winner_id: 2}),
      knex('battle_results').insert({winner_id: 4}),
      knex('battle_results').insert({winner_id: 5}),
      knex('battle_results').insert({winner_id: 6}),
    ]
  );

  await knex('robots_battles').del();
  await Promise.all (
    [
      knex('robots_battles').insert({battle_id: 1, robot_id: 1}),
      knex('robots_battles').insert({battle_id: 1, robot_id: null}),
      knex('robots_battles').insert({battle_id: 2, robot_id: 2}),
      knex('robots_battles').insert({battle_id: 2, robot_id: null}),
      knex('robots_battles').insert({battle_id: 3, robot_id: 3}),
      knex('robots_battles').insert({battle_id: 3, robot_id: null}),
      knex('robots_battles').insert({battle_id: 1, robot_id: 1}),
      knex('robots_battles').insert({battle_id: 1, robot_id: null}),
      knex('robots_battles').insert({battle_id: 2, robot_id: 2}),
      knex('robots_battles').insert({battle_id: 2, robot_id: null}),
      knex('robots_battles').insert({battle_id: 3, robot_id: 3}),
      knex('robots_battles').insert({battle_id: 3, robot_id: null}),
      knex('robots_battles').insert({battle_id: 1, robot_id: 1}),
      knex('robots_battles').insert({battle_id: 1, robot_id: null}),
      knex('robots_battles').insert({battle_id: 2, robot_id: 1}),
      knex('robots_battles').insert({battle_id: 2, robot_id: null}),
      knex('robots_battles').insert({battle_id: 3, robot_id: 2}),
      knex('robots_battles').insert({battle_id: 3, robot_id: null}),
      knex('robots_battles').insert({battle_id: 1, robot_id: 4}),
      knex('robots_battles').insert({battle_id: 1, robot_id: null}),
      knex('robots_battles').insert({battle_id: 2, robot_id: 5}),
      knex('robots_battles').insert({battle_id: 2, robot_id: null}),
      knex('robots_battles').insert({battle_id: 3, robot_id: 6}),
      knex('robots_battles').insert({battle_id: 3, robot_id: null}),
      
    ]
  );
  
};