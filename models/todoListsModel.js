const mongoose = require('mongoose')

const todolistsSchema = new mongoose.Schema({
    title: String,
    createdTime: String,
    createdBy: String
})

const todoListDB = mongoose.model("todolists", todolistsSchema)

const {todoListsCollection: db} = require('../database/database');

async function createTodoListModel(body) {

    body['createdTime'] = currentDate();
    body['createdBy'] = 'Karl'

    const result = await todoListDB.create(body, function(err, newDoc){})
    return result
}
function currentDate(){

    var datum = new Date();
    return datum.getTime()

}
async function getAllTodoListsModel(){
    const result = await todoListDB.find({})
    return result;

}
async function getSingleTodoListModel(id){

    const result = await todoListDB.findOne({ _id: id })
    return result;
}

async function removeTodoListModel(id){

    const result = await todoListDB.remove({ _id: id})
    return result;

}

async function editTodoListModel(id, body){
    const action = await todoListDB.update({ _id: id}, {$set: {title: body.title}},{})
    const result = await todoListDB.findOne({ _id: id })
    return result

}

module.exports = {

    createTodoListModel,
    getAllTodoListsModel,
    getSingleTodoListModel,
    removeTodoListModel,
    editTodoListModel

}