const mongoose = require('mongoose')
const {todosCollection: db} = require('../database/database');

const todosSchema = new mongoose.Schema({})

const testDB = mongoose.model("todos", todosSchema)


async function getAllTodosModel() {

    const result = await db.find({})
    return result
}

async function dbtest() {

    const result = await testDB.find({})
    console.log(result)
}
async function getSingleTodoModel(id) {

    const result = await db.findOne({ _id: id })
    return result
}
async function createTodoModel(body) {

    body['content'] = body.content || "hej"
    body['deadline'] = body.deadline || " "
    body['createdTime'] = currentDate();
    body['done'] ='false'
    body['todoListId'] =''

    const result = await db.insert(body, function(err, newDoc){})
    return result
}
async function editTodoModel(id, body) {

    const result = await db.update({ _id: id}, {$set: {title: body.title, content: body.content, deadline: body.deadline}},{})
    return result
}
async function deleteTodoModel(id) {


    const result = await db.remove({ _id: id}, {}, function(err, numRemoved){})
    return result
}
function currentDate(){

    var datum = new Date();
    return datum.getTime()

}

module.exports = {
    getAllTodosModel,
    getSingleTodoModel,
    createTodoModel,
    editTodoModel,
    deleteTodoModel,
    dbtest
}