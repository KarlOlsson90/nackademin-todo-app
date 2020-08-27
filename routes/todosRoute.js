console.log("routes/todosRoute.js")

const express = require("express");
const controller = require('../controllers/todosController');
const router = express.Router();

router.get('/', controller.getAllTodosController)
router.get('/:id', controller.getSingleTodoController)
router.post('/', controller.createTodoController)
router.put('/:id', controller.editTodoController)
router.delete('/:id', controller.deleteTodoController)

module.exports = router