

const express = require("express");
const controller = require('../controllers/todosController');
const router = express.Router();

const { authenticate } = require("../middlewares/authenticateMiddleware");

router.get('/', controller.getAllTodosController)
router.get('/:id', controller.getSingleTodoController)
router.post('/', authenticate, controller.createTodoController)
router.patch('/:id', authenticate, controller.editTodoController)
router.delete('/:id', authenticate, controller.deleteTodoController)

module.exports = router