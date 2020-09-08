const model = require('../models/todoListsModel');

async function getAllTodoListsController(req, res){
    try {
        var result = await model.getAllTodoListsModel()
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function getSingleTodoListController(req, res){
    try {
        var id = req.params.id
        var result = await model.getSingleTodoListModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
        }
}
async function createTodoListController(req, res){
    try {
        const body = {title: req.body.title}
        var result = await model.createTodoListModel(body)
        return res.status(201).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function editTodoListController(req, res){
    try {
        var id = req.params.id
        const body = {title: req.body.title}
        var result = await model.editTodoListModel(id, body)
        return res.status(204).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function deleteTodoListController(req, res){
    try {
        const id = req.params.id
        var result = await model.removeTodoListModel(id)
        return res.status(204).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    getAllTodoListsController,
    getSingleTodoListController,
    createTodoListController,
    editTodoListController,
    deleteTodoListController
}