const model = require('../models/todosModel');

async function isAdmin(userRole){
    if (userRole !== 'admin'){
        return false;
    }
        return true;
}
async function isCreator(todoId, userId){
    post = await model.getSingleTodoModel(todoId)
    if (post.createdBy !== userId) {
        return false;
    }
        return true;
}

module.exports = {
    isAdmin, 
    isCreator
}