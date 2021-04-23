const express = require('express')
const usersRouter = express.Router()

const { getSingleUser, getUsers, createUser, updateUserName, updateAvatar } = require('../controllers/userController.js')

usersRouter.get('/users', getUsers)
usersRouter.get('/users/:id', getSingleUser)
usersRouter.post('/users', createUser)
usersRouter.patch('/users/me', updateUserName)
usersRouter.patch('/user/avatar', updateAvatar)


module.exports = {usersRouter}
