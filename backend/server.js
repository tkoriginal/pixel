"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 5000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const knexConfig  = require("./knexfile");
const knexLogger  = require('knex-logger');
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const cookieSession = require('cookie-session');

const {generateRobot} = require('./util/robotGenerator.js')
const {Combat} = require('./util/robotCombat.js')

// Seperated Routes for each Resource
// const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  secret: process.env.secret
}))
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Home page

app.get('/robots/new', (req, res) => {
  let starterBots =  generateRobot(3, 30, false)
  res.json(starterBots);
})

app.post('/robots/opponents', (req, res) => {

  let powerLevel = req.body.strength + req.body.dexterity + req.body.armour + ((req.body.health - 50) / 5)
  let combatBots =  generateRobot(3, powerLevel, false)
  res.json(combatBots);
})

app.post('/user/active-robots', (req, res) => {
  knex('robots')
    .select('*')
    .where({
      user_id: req.body.user_id,
      active: true
    })
    .returning('*')
    .then(users_robots => {
      res.json({
        robots: users_robots
      })
    })
    .catch(err => console.log(err.message)) 
})

app.get('/user/retired-robots', (req, res) => {
  knex('robots')
    .select("*")
    .where({
      user_id: req.body.user_id,
      active: false
    })
    .returning("*")
    .then(users_robots => {
      res.json({
        robots: users_robots
      })
    })
    .catch(err => console.log(err.message)) 
})

app.get('/hall-of-fame', (req, res) => {

  knex
  .from('battle_results')
  .join('robots', 'battle_results.winner_id', '=', 'robots.id')
  .join('users', 'robots.user_id', '=', 'users.id')
  .limit(10)
  .count('winner_id')
  .groupBy('winner_id', 'users.id', 'users.name', 'robots.name', 'robots.img_url')
  .orderBy('count', 'desc')
  .select('winner_id', 'users.id', 'users.name as userName', 'robots.name as robotName', 'robots.img_url')
  .returning('*')
  .then(results => {
    res.json(results)
  })

})

app.post('/login', (req, res) => {
  let validUser;
  knex('users')
    .select('*')
    .where({
      email: req.body.email ,
      password: req.body.password
    })
    .then( rows => {
      if(rows[0]) {

        knex('robots')
          .select('*')
          .where({
            user_id: rows[0].id,
            active: true
          })
          .then(users_robots => {
            console.log(users_robots)
            res.json({
              id: rows[0].id,
              name: rows[0].name,
              email: rows[0].email,
              robots: users_robots
            }) 
          })  
        req.session.user_id = rows[0].name;
        // res.json({name: rows[0].name, email})
      } else res.status(500).json({error: 'Invalid Login'})
    })
})

app.post('/robots/retire', (req, res) => {
  knex('robots')
    .where('id', req.body.id)
    .update('active', false)
    .catch(err => console.log(err.message))
    .then(function () {
      knex('robots')
      .select('*')
      .where({
        user_id: req.body.user_id,
        active: true
      })
      .then(users_robots => {
        res.json({
          robots: users_robots
        }) 
      })
      .catch(err => console.log(err.message))  
    });
})

app.post('/robots/add-robot', (req, res) => {
  knex('robots')
    .insert({
      name: req.body.robotName,
      user_id: req.body.user_id,
      img_url: req.body.robot.img_url,
      health: req.body.robot.health,
      strength: req.body.robot.strength,
      dexterity: req.body.robot.dexterity,
      armour: req.body.robot.armour,
      traits: req.body.robot.traits, //NEED TO FIX FORMAT
      remainingStats: req.body.robot.remainingStats,
      active: true
    })
    .returning('*')
    .then( () => {
      knex('robots')
        .select('*')
        .where({
          user_id: req.body.user_id,
          active: true
        })
        .then(users_robots => {
          console.log(users_robots)
          res.json({
            robots: users_robots
          })
        })  
      }
    )
    .catch(err => console.log(err.message));
})

app.post('/robots/update', (req, res) => {
  knex('robots')
    .where('id', req.body.id)
    .update({
      health: req.body.health,
      strength: req.body.strength,
      dexterity: req.body.dexterity,
      armour: req.body.armour,
      remainingStats: req.body.remainingStats,
    })
    .then(function () {
      console.log("Retired robot # " + req.body.id);
      knex('robots')
      .select('*')
      .where({
        user_id: req.body.user_id,
        active: true
      })
      .then(users_robots => {
        res.json({
          robots: users_robots
        }) 
      })
      .catch(err => console.log(err.message))  
    })
    .catch(err => console.log(err.message))

})

app.post('/robots/fight', (req, res) => {
  const result = Combat(req.body[0], req.body[1])
  knex('battle_results') //insert to battle results  with the winner ID
    .insert({
      winner_id: result.winner.id,
      battle_log: JSON.stringify(result.log)
    })
    .returning('id')
    .then(battleEntry => {
      let [battleID] = battleEntry;
      knex('robots_battles') //create first robot_battle entry with id from battle results, and first robot_id
        .insert({
          battle_id: battleID,
          robot_id: req.body[0].id
        })
        .returning('battle_id')
        .then(battleEntry => {
          let [battleID] = battleEntry;

          knex('robots_battles')  //create first robot_battle entry with id from battle results, and second robot_id
            .insert({
              battle_id: battleID,
              robot_id: req.body[1].id
            })
              .then( () => {
                if (result.winner.id){
                  knex('robots') //Giving winner stat points.
                    .where('id', result.winner.id)
                    .update('remainingStats', (result.winner.remainingStats + 5))
                    .returning('*')
                    .then( () => {
                      res.json(result);
                    })
                } else {
                  res.json(result);
                }
              })

            .catch(err => console.log(err.message));
        })
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));

})

app.post("/registration", (req, res) => {

  knex('users')
    .where('email', req.body.email)
    .then(result => {
      console.log(result);
      if (result[0]) {
        res.status(500).send('Email already exists.')
      } else {
        knex('users')
        .insert({ 
          name: req.body.name,
          password: req.body.password,
          email: req.body.email
          }) 
        .then(
          res.status(200).send('User succesfully created.')
        )
        .catch(err => console.log(err.message));
      }
    })
    .catch(err => console.log(err.message));

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


