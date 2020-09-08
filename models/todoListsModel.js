
const {todoListsCollection: db} = require('../database/database');

async function createTodoListModel(body) {

    body['createdTime'] = currentDate();
    body['createdBy'] = 'Karl'

    const result = await db.insert(body, function(err, newDoc){})
    return result
}

function currentDate(){

    var datum = new Date();
    return datum.getTime()

}

async function clearTodoListsModel(){

    const result = await db.remove({}, { multi: true }, async function(err, numRemoved) {
        
        await db.loadDatabase(function(err) {});
        return numRemoved
      });
    return result;

}
async function getAllTodoListsModel(){
    console.log("test")
    const result = await db.find({})
    return result;

}
async function getSingleTodoListModel(id){

    const result = await db.findOne({ _id: id })
    return result;
}

async function removeTodoListModel(id){

    const result = await db.remove({ _id: id}, {}, function(err, numRemoved){})
    return result;

}

async function editTodoListModel(id, body){
    const action = await db.update({ _id: id}, {$set: {title: body.title}},{})
    const result = await db.findOne({ _id: id })
    return result

}

module.exports = {

    createTodoListModel,
    clearTodoListsModel,
    getAllTodoListsModel,
    getSingleTodoListModel,
    removeTodoListModel,
    editTodoListModel

}