
const express = require('express')

const todosRoute = require('./todosRoute.js')
const usersRoute = require('./usersRoute.js')
const todoListsRoute = require('./todoListsRoute.js')


const router = express.Router()

router.use('/todos', todosRoute);
router.use('/users', usersRoute);
router.use('/todoLists', todoListsRoute);

module.exports = router
