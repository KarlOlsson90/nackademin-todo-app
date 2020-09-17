const mongoose = require('mongoose')
const {todosCollection: db} = require('../database/database');

const todosSchema = new mongoose.Schema({
    title: String,
    content: String,
    deadline: String,
    createdTime: String,
    done: Boolean,
    todoListId: String,
    createdBy: String
})

const todoDB = mongoose.model("todos", todosSchema)

async function getAllTodosModel() {

    const result = await todoDB.find({})

    return result
}
async function getSingleTodoModel(id) {
    
    const result = await todoDB.findOne({ _id: id })

    return result
}
async function createTodoModel(body) {
    
    body['content'] = body.content || "hej"
    body['deadline'] = body.deadline || " "
    body['createdTime'] = currentDate();
    body['done'] ='false'
    body['todoListId'] =''

    const result = await todoDB.create(body)

    return result
}
async function editTodoModel(id, body) {
    
    const result = await todoDB.update({ _id: id}, {$set: {title: body.title, content: body.content, deadline: body.deadline, todoListId: body.todoListId}},{})
    return result
}
async function deleteTodoModel(id) {
    
    
    const result = await todoDB.remove({ _id: id})
    console.log(result)
    return result
}
function currentDate(){
    
    var datum = new Date();
    return datum.getTime()
    
}

/*------------------------------------
    TESTER
------------------------------------*/

module.exports = {
    getAllTodosModel,
    getSingleTodoModel,
    createTodoModel,
    editTodoModel,
    deleteTodoModel,
}