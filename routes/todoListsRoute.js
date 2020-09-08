

const express = require("express");
const controller = require('../controllers/todoListsController');
const router = express.Router();

const { authenticate } = require("../middlewares/authenticateMiddleware");

router.get('/', controller.getAllTodoListsController)
router.get('/:id', controller.getSingleTodoListController)
router.post('/', authenticate, controller.createTodoListController)
//router.patch('/:id', authenticate, controller.)
//router.delete('/:id', authenticate, controller.)

module.exports = router