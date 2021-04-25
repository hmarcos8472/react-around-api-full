const express = require('express')
const {celebrate, Joi} = require('celebrate')
const usersRouter = express.Router()

const { getSingleUser, getUsers, updateUserName, updateAvatar, getCurrentUser } = require('../controllers/userController.js')

usersRouter.get('/users', getUsers)
usersRouter.get('/me', getCurrentUser)

usersRouter.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24)
    }).unknown(true)
  }),
  getSingleUser
);

usersRouter.patch(
  '/me',
  celebrate({
    params: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30)
    }).unknown(true)
  }),
  updateUserName
)

usersRouter.patch(
  '/me/avatar',
  celebrate({
    params: Joi.object().keys({
      avatar: Joi.string().uri().required()
    }).unknown(true)
  }),
  updateAvatar
)

module.exports = {usersRouter}
