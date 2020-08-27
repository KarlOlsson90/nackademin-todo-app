var Datastore = require('nedb-promises')

todoCollection = new Datastore({ filename: 'todoCollection', autoload: true });
userCollection = new Datastore({ filename: 'userCollection', autoload: true });

module.exports = {todoCollection, userCollection};
