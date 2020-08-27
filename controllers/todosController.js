console.log("controllers/todosController.js")

const model = require('../models/todosModel');

async function getAllTodosController(req, res){
    try {
        var result = await model.getAllTodosModel()
        res.json(result)
    } catch(error) {
        res.json("Unable to find Todos")
    }
}
async function getSingleTodoController(req, res){
    try {
        var id = req.params.id
        console.log(id)
        var result = await model.getSingleTodoModel(id)
        res.json(result)
    } catch(error) {
        res.json("Unable to find Todo")
        }
}
async function createTodoController(req, res){
    try {
        const body = {title: req.body.title, content: req.body.content, deadline: req.body.deadline}
        var result = await model.createTodoModel(body)
        res.json("lade till "+ result)
    } catch(error) {
        res.json("Unable to create Todo")
    }
}
async function editTodoController(req, res){
    try {
        var id = req.params.id
        const body = {title: req.body.title, content: req.body.content, deadline: req.body.deadline}
        var result = await model.editTodoModel(id, body)
        res.json(result)
    } catch(error) {
        res.json("Undable to edit " + req.body.title)
    }
}
async function deleteTodoController(req, res){
    try {
        const id = req.params.id
        var result = await model.deleteTodoModel(id)
        res.json(result + " togs bort")
    } catch(error) {
        res.json("Unable to remove Todo")
    }
}

module.exports = {
    getAllTodosController,
    getSingleTodoController,
    createTodoController,
    editTodoController,
    deleteTodoController
}