
var Datastore = require('nedb-promises')

if(process.env.ENV === 'dev'){
todosCollection = new Datastore({ filename: __dirname + '/todosCollection_dev', autoload: true });
usersCollection = new Datastore({ filename: __dirname + '/usersCollection_dev', autoload: true });
todoListsCollection = new Datastore({ filename: __dirname + '/todoListsCollection_dev', autoload: true });
} else {
todosCollection = new Datastore({ filename: __dirname + '/todosCollection_test', autoload: true });
usersCollection = new Datastore({ filename: __dirname + '/usersCollection_test', autoload: true });
todoListsCollection = new Datastore({ filename: __dirname + '/todoListsCollection_test', autoload: true });
}
module.exports = {todosCollection, usersCollection, todoListsCollection};
