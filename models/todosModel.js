console.log("models/todosModel.js")
const {todosCollection: db} = require('../database/database');

async function getAllTodosModel() {
    console.log("getAllTodos initiated;")
    const result = await db.find({})
    return result
}
async function getSingleTodoModel(id) {
    console.log("getSingleTodo initiated;")
    const result = await db.findOne({ _id: id })
    return result
}
async function createTodoModel(body) {
    console.log("createTodo initiated;")
    body['createdTime'] = currentDate();
    body['createdBy'] = 'Karl'
    body['done'] ='false'

    const result = await db.insert(body, function(err, newDoc){})
    return result
}
async function editTodoModel(id, body) {
    console.log("updateTodo initiated;")
    const result = await db.update({ _id: id}, {$set: {title: body.title, content: body.content, deadline: body.deadline}},{})
    return result
}
async function deleteTodoModel(role, id) {
    if (role !== 'admin'){
        
        console.log("inte admin")

    } else {console.log("admin") }
    
    console.log("deleteTodo initiated;")
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
    deleteTodoModel
}