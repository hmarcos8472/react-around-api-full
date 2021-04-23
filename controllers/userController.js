const User = require('../models/user.js')

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
  const {name, about, avatar} = req.body
  return User.countDocuments({})
  .then(id => {
    return User.create({name, about, avatar, id})
  })
  .then(user => {
    res.status(200).send(user)
  })
  .catch((err) => {
    if (err.name === "ValidationError") {
      res.status(400).send({message : "User validation failed"})
    } else {
      res.status(500).send({message : "Internal server error"})
    }
  })
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
