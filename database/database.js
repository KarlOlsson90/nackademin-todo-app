console.log("database/database.js")

var Datastore = require('nedb-promises')

todosCollection = new Datastore({ filename: __dirname + '/todosCollection', autoload: true });
usersCollection = new Datastore({ filename: __dirname + '/usersCollection', autoload: true });

module.exports = {todosCollection, usersCollection};
