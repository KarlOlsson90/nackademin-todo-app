const express = require('express')

const todosRoute = require('./todosRoute.js')
const commentsRoute = require('./commentsRoute.js')
const usersRoute = require('./usersRoute.js')

const router = express.Router()

router.use('/', todosRoute);
router.use('/', commentsRoute);
router.use('/', usersRoute);

module.exports = router
