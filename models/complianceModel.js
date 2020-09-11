const {usersCollection: users_DB, todoListsCollection: todoLists_DB, todosCollection: todos_DB} = require('../database/database');

async function getAllUserDataModel (id) {
    
    var response = [];
    userObject = await users_DB.findOne({ _id: id })
    delete userObject.password
    response.push(userObject)
    
    todoObject = await todos_DB.find({createdBy: id})
    response.push(todoObject)

    todoListObject = await todoLists_DB.find({createdBy: id})
    response.push(todoListObject)
    
    return response;
}

async function clearUserDataModel (id) {
    console.log("hej")
}

module.exports = {
    getAllUserDataModel,
    clearUserDataModel
}