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
        req.session.user_id = rows[0].name;
        res.json({name: rows[0].name})
      } else res.status(500).json({error: 'Invalid Login'})
    })

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


