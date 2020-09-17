const model = require('../models/todosModel');
const {isAdmin, isCreator, isCreatorOrAdmin} = require('../middlewares/permissionsMiddleware')

async function getAllTodosController(req, res){
    try {
        var result = await model.getAllTodosModel()
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function getSingleTodoController(req, res){
    try {
        var id = req.params.id
        var pass = await isCreatorOrAdmin(id, req.user)

        if(!pass){
            return res.status(403).json("Not authorized to perform action")
        }
        var result = await model.getSingleTodoModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
        }
}
async function createTodoController(req, res){
    try {
        const body = {title: req.body.title, content: req.body.content, deadline: req.body.deadline, createdBy: req.user.userId}
        var result = await model.createTodoModel(body)
        return res.status(201).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function editTodoController(req, res){
    try {
        var id = req.params.id
        const body = {title: req.body.title, content: req.body.content, deadline: req.body.deadline, todoListId: req.body.todoListId}
        var result = await model.editTodoModel(id, body)
        return res.status(204).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function deleteTodoController(req, res){

    const id = req.params.id
    
    try {
        var pass = await isCreatorOrAdmin(id, req.user)
        if(!pass){
            return res.status(403).json("Not authorized to perform action")
        }
        //var result = await model.deleteTodoModel(id)
        var result = await model.getSingleTodoModel(id)
        return res.status(201).json("removed" + result);
        
    } catch(error) {
        return res.status(400).json(error);
    }

}



module.exports = {
    getAllTodosController,
    getSingleTodoController,
    createTodoController,
    editTodoController,
    deleteTodoController
}