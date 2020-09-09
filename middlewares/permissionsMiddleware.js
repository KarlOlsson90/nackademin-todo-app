const todosModel = require('../models/todosModel');

async function isAdmin(userRole){
    if (userRole !== 'admin'){

        return false;
    }

        return true;
}
async function isCreator(todoId, userId){
    todo = await todosModel.getSingleTodoModel(todoId)
    
    if (todo.createdBy !== userId) {

        return false;
    }

        return true;
        
}
async function isCreatorOrAdmin(todoId, userObject){

    var admin = await isAdmin(userObject.role)
    var creator = await isCreator(todoId, userObject.userId)

    if (!admin && !creator) {


        return false;

    }

    return true;
}

module.exports = {
    isAdmin, 
    isCreator,
    isCreatorOrAdmin
}