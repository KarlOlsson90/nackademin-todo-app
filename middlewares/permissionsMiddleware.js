const todosModel = require('../models/todosModel');

async function isAdmin(userRole){
    if (userRole !== 'admin'){
        console.log("inte admin!")
        return false;
    }
        console.log("admin!")
        return true;
}
async function isCreator(todoId, userId){
    todo = await todosModel.getSingleTodoModel(todoId)
    
    if (todo.createdBy !== userId) {
        console.log("inte skapare!")
        return false;
    }
    console.log("skapare!")
        return true;
        
}

module.exports = {
    isAdmin, 
    isCreator
}