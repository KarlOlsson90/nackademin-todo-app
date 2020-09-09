const model = require('../models/usersModel');
const { JsonWebTokenError } = require('jsonwebtoken');

async function getAllUsersController(req, res){
    try {
        var result = await model.getAllUsersModel()
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function getSingleUserController(req, res){
    try {
        var id = req.params.id
        var result = await model.getSingleUserModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
        }
}
async function createUserController(req, res){
    try {
        const body = {email: req.body.email, password: req.body.password}
        var result = await model.createUserModel(body)
        return res.status(201).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function editUserController(req, res){
    try {
        var id = req.params.id
        const body = {email: body.email, password: body.password}
        var result = await model.editUserModel(id, body)
        return res.status(204).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function deleteUserController(req, res){
    try {
        const id = req.params.id
        var result = await model.deleteUserModel(id)
        return res.status(204).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function loginUserController(req, res){
    try {
        const body = {email: req.body.email, password: req.body.password}
        const token = await model.loginUserModel(body);
        return res.status(200).json(token);
      } catch (error) {
        return res.status(400).json(error);
      }
}

module.exports = {
    getAllUsersController,
    getSingleUserController,
    createUserController,
    editUserController,
    deleteUserController,
    loginUserController
}