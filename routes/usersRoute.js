console.log("routes/usersRoute.js")

const express = require("express");
const controller = require('../controllers/usersController');
const router = express.Router();

const { authenticate } = require("../middlewares/authenticateMiddleware");

router.get('/', authenticate, controller.getAllUsersController)
router.get('/:id', authenticate, controller.getSingleUserController)
router.post('/', authenticate, controller.createUserController)
router.put('/:id', authenticate, controller.editUserController)
router.delete('/:id', authenticate, controller.deleteUserController)

router.post('/login', controller.loginUserController)


module.exports = router