const {usersCollection: users_DB, todoListsCollection: todoLists_DB, todosCollection: todos_DB} = require('../database/database');

async function getAllUserDataModel () {
    console.log("hej")
}

async function clearUserDataModel () {
    console.log("hå")
}

module.exports = {
    getAllUserDataModel,
    clearUserDataModel
}