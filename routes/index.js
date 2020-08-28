console.log("routes/index.js")

const express = require('express')

const todosRoute = require('./todosRoute.js')
const usersRoute = require('./usersRoute.js')

const router = express.Router()

router.use('/todos', todosRoute);
router.use('/users', usersRoute);

module.exports = router
