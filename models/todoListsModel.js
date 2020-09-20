const mongoose = require('mongoose')

const todolistsSchema = new mongoose.Schema({
    title: String,
    createdTime: String,
    createdBy: String
})

const todoListDB = mongoose.model("todolists", todolistsSchema)

async function createTodoListModel(body) {

    body['createdTime'] = currentDate();
    body['createdBy'] = 'Karl'

    const result = await todoListDB.create(body)
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

    const result = await todoListDB.deleteOne({ _id: id})
    return result;

}

async function editTodoListModel(id, body){
    const result = await todoListDB.updateOne({ _id: id}, {$set: {title: body.title}},{})
    return result

}

module.exports = {

    createTodoListModel,
    getAllTodoListsModel,
    getSingleTodoListModel,
    removeTodoListModel,
    editTodoListModel

}