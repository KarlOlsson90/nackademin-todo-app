console.log("routes/index.js")

const express = require('express')

const todosRoute = require('./todosRoute.js')
const commentsRoute = require('./commentsRoute.js')
const usersRoute = require('./usersRoute.js')

const router = express.Router()

router.use('/todos', todosRoute);
router.use('/comments', commentsRoute);
router.use('/users', usersRoute);

module.exports = router
