const db = require('../database/database');
const { json } = require('body-parser');

module.exports = { 
    updateTodo(id, body) {
        console.log("updateTodo initiated;")
        db.update({ _id: id}, {title: body.title, content: body.content},{})
        
    }, 
    createTodo(body) {
        console.log("createTodo initiated;")
        body['createdTime'] = currentDate();
        body['createdBy'] = 'Karl'
        body['done'] ='false'

        db.insert(body, function(err, newDoc){})
        
    },
    deleteTodo(id) {
        console.log("deleteTodo initiated;")
        db.remove({ _id: id}, {}, function(err, numRemoved){})
    },
    async getAllTodos() {
        console.log("getAllTodos initiated;")

        const result = await db.find({})
        return result

    }


    


}

function currentDate(){

    var datum = new Date();
    
    return datum.getTime()

}