require('dotenv').config({ path: '../.env' });

const settings = require('../knexfile.js')['development'];

const knex = require('knex')(settings);



function activeRobots(input_id){

  knex('robots')
    .select('*')
    .where({
      user_id: input_id,
      active: true
    })
    .returning('*')
    .then(users_robots => {
      console.log(`All of user 1's active robots:`)
      console.log(users_robots)
    }) 

}

// activeRobots(1);

function retiredRobots(input_id){

  knex('robots')
    .select('*')
    .where({
      user_id: input_id,
      active: false
    })
    .returning('*')
    .then(users_robots => {
      console.log(`All of user 2's retired robots:`)
      console.log(users_robots)
    }) 

}

// retiredRobots(2);

function getHallOfFame() {

  knex
    .from('battle_results')
    .join('robots', 'battle_results.winner_id', '=', 'robots.id')
    .join('users', 'robots.user_id', '=', 'users.id')
    .limit(10)
    .count('winner_id')
    .groupBy('winner_id', 'users.id', 'users.name', 'robots.name')
    .orderBy('count', 'desc')
    .select('winner_id', 'users.id', 'users.name as userName', 'robots.name as robotName')
    .returning('*')
    .then(results => {
      console.log(results)
    })
}

// getHallOfFame();

function getBattlesFought (){
  knex('robots_battles')
    .count('robot_id')
    .groupBy('robot_id')
    .select('robot_id')
    .returning('robot_id')
    .then(results => {
      console.log(results)
    })
}

// getBattlesFought();