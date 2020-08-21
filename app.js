const express = require("express");
const routes = require('./routes/routes')
const app = express();

//Frontend
app.use(express.static('public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

//Middelware
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/', routes)

//Server
const port = 3000
app.listen(port);
console.log("Server running on port " + port + ";")