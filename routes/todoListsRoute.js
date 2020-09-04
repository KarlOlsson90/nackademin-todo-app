

const express = require("express");
const controller = require('../controllers/todoListsController');
const router = express.Router();

const { authenticate } = require("../middlewares/authenticateMiddleware");

router.post('/', authenticate, controller.createTodoListController)

module.exports = router