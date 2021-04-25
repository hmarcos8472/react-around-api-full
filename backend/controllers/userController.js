const User = require('../models/user.js')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const BadRequest = require('../middleware/errors/BadRequest'); //400
const NotFound = require('../middleware/errors/NotFound'); //404
const Unauthorized = require('../middleware/errors/Unauthorized'); //401
const ServerError = require('../middleware/errors/ServerError') //500

const { NODE_ENV, JWT_SECRET } = process.env

/////
function getUsers(req, res) {
  return User.find({})
    .then(users => {
      res.send(users)
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
};

/////
function getSingleUser(req, res) {
  return User.find({_id: req.params.id})
    .then((user) => {
      if (Object.keys(user).length !== 0) {
        return res.status(200).send(user);
      }
      return res.status(404).send({message: "User not found"});
    })
    .catch((err) => {
     if (err.name === "CastError") {
       res.status(404).send({message: "User not found"});
     }
     else {
       res.status(500).send({message: "500 Internal server error"})
     }
   })
};

/////
function createUser(req, res) {
  const {email, password, name, about, avatar} = req.body

  if(!email || !password) {
    throw new BadRequest('The password or email you entered were not valid.')
  }

  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({email, password: hash, name, about, avatar})
        .then((user) => {
          if(!user) throw new BadRequest('Inavlid user data.')

          res.status(201).send({
            _id: user._id,
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar
          })
        })
        .catch(next);
  })
};

/////
function login(req, res, next) {
  const {email, password} = req.body
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFound('User does not exist')
      }
      const token = jwt.sign(
        {_id: user._id},
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {expiresIn: '7d'}
      );
      res.send({token})
    })
    .catch((err) => {
      if (res.status(401)) {
        next(new Unauthorized('Incorrect email and/or password.'))
      } else next(err)
    })
};

/////
function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if(!user) throw new NotFound('User not found.');

      res.send({ data: user});
    })
    .catch(next);
}

/////
function updateUserName(req, res) {
  User.findByIdAndUpdate(req.params.id, "name: req.body")
    .then(user => res.send({ data: req.body }))
    .catch((err) => {
      res.status(500).send({ message: "500 Internal server error" });})
};

/////
function updateAvatar(req, res) {
  User.findByIdAndUpdate(req.params.id, "avatar: req.body")
    .then(user => res.send({ data: req.body }))
    .catch((err) => {
      res.status(500).send({ message: "500 Internal server error" });})
};

module.exports = {getSingleUser, getUsers, createUser, updateUserName, updateAvatar}
