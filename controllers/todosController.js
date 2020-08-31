console.log("controllers/todosController.js")

const model = require('../models/todosModel');

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
        console.log(id)
        var result = await model.getSingleTodoModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
        }
}
async function createTodoController(req, res){
    try {
        const body = {title: req.body.title, content: req.body.content, deadline: req.body.deadline}
        var result = await model.createTodoModel(body)
        return res.status(201).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function editTodoController(req, res){
    try {
        var id = req.params.id
        const body = {title: req.body.title, content: req.body.content, deadline: req.body.deadline}
        var result = await model.editTodoModel(id, body)
        return res.status(204).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function deleteTodoController(req, res){
    const id = req.params.id
    
    const asd = await isCreator(id)
    console.log(asd)
    console.log(isAdmin(req.user.role))
    console.log(req.user)
    isCreator(id, req.user.id)
    try {
        
        if (req.user.role !== 'admin'){
            console.log("ej admin!")
            return res.status(403).json()
        } 
        console.log("admin!")

        //var result = await model.deleteTodoModel(id)

        return res.status(204).json(result);
        
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function isAdmin(role){
    if (role !== 'admin'){
        return false;
    }
        return true;

}

async function isCreator(id, userId){
    console.log("isCreator körs")
    post = await model.getSingleTodoModel(id)
    if (post.createdBy !== userId) {
        console.log("inte skapare!")
        return false;
    }
        console.log("skapare!")
        return true;
}


module.exports = {
    getAllTodosController,
    getSingleTodoController,
    createTodoController,
    editTodoController,
    deleteTodoController
}