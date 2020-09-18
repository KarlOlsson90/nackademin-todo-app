
const mongoose = require('mongoose')

const todoListDB = mongoose.model("todolists")
const todoDB = mongoose.model("todos")
const userDB = mongoose.model("users")

async function getAllUserDataModel(id) {
    
    var response = [];
    userObject = await userDB.findOne({ _id: id })
    delete userObject.password
    response.push(userObject)
    
    todoObject = await todoDB.find({createdBy: id})
    response.push(todoObject)

    todoListObject = await todoListDB.find({createdBy: id})
    response.push(todoListObject)
    
    return response;
}

async function clearUserDataModel(id) {
    todoListDB.deleteMany({createdBy: id})
    todoDB.deleteMany({createdBy: id})
    userDB.remove({ _id: id})
}

module.exports = {
    getAllUserDataModel,
    clearUserDataModel
}