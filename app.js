require("dotenv").config();
const express = require("express");
const routes = require('./routes/')
const app = express();

//Frontend
app.use(express.static('public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

//Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', routes)

//Server
const port = 4000
app.listen(port);
console.log("Server running on port " + port + ";")

module.exports = app