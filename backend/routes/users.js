const express = require('express')
const {celebrate, Joi} = require('celebrate')

const usersRouter = express.Router()

const { getSingleUser, getUsers, createUser, updateUserName, updateAvatar, login, getCurrentUser } = require('../controllers/userController.js')

usersRouter.get('/users', getUsers)
usersRouter.get('/users/me', getCurrentUser)

usersRouter.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24)
    }).unknown(true)
  }),
  getSingleUser
)

usersRouter.post('/users', createUser)

usersRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30)
    }).unknown(true)
  }),
  updateUserName
)

usersRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().required()
    }).unknown(true)
  }),
  updateAvatar
)


module.exports = {usersRouter}
