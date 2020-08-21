var Datastore = require('nedb-promises'), 

db = new Datastore({ filename: 'Databasen', autoload: true });

module.exports = db;
