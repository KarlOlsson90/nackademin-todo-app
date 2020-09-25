
const express = require("express");
const controller = require('../controllers/todoListsController');
const router = express.Router();

const { authenticate } = require("../middlewares/authenticateMiddleware");

router.get('/', authenticate, controller.getAllTodoListsController)
router.get('/:id', authenticate, controller.getSingleTodoListController)
router.post('/', authenticate, controller.createTodoListController)
router.patch('/:id', authenticate, controller.editTodoListController)
router.delete('/:id', authenticate, controller.deleteTodoListController)

module.exports = router