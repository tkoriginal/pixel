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
app.get("/api/getList", (req, res) => {
    knex
    .select("*")
    .from("users")
    .then((results) => {
      res.json(results);
  });
});

app.post('/login', (req, res) => {
  let validUser;
  knex('users')
    .select('*')
    .where({
      name: req.body.name ,
      password: req.body.password
    })
    .then( rows => {
      if(rows[0]) {

        knex('robots')
          .select('*')
          .where('user_id', rows[0].id)
          .then(users_robots => {
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

app.post('/retire', (req, res) => {
  knex('robots')
    .where('id', req.body.id)
    .update('active', false)
    .catch(err => console.log(err.message))
    .then(function () {
      console.log("Retired robot # " + req.body.id);
      knex('robots')
      .select('*')
      .where('user_id', req.body.user_id)
      .then(users_robots => {
        res.json({
          robots: users_robots
        }) 
      })  
    });
})

app.post('/add-robot', (req, res) => {
  knex('robots')
    .insert({
      name: req.body.name,
      user_id: req.body.user_id,
      health: req.body.hp,
      strength: req.body.str,
      dexterity: req.body.dex,
      armor: req.body.arm,
      active: true
    })
    .returning('*')
    .catch(err => console.log(err.message))
    .then();
})

app.get('/generate-starter-robots', (req, res) => {
  let starterBots =  generateRobot(3, 30, false)
  res.json(starterBots);
})

app.post("/registration", (req, res) => {
  console.log("Should Print Name:")
  console.log(req.body)

  knex('users')
    .insert({ name: req.body.name }) 
    .returning('*')
    .catch(err => console.log(err.message))
    .then();

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



//Test code
console.log(generateRobot(3, 30, false));