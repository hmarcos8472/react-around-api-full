const bcrypt = require('bcryptjs')

const BadRequest = require('../middleware/errors/BadRequest');
const NotFound = require('../middleware/errors/NotFound');
const Unauthorized = require('../middleware/errors/Unauthorized');

const User = require('../models/user.js')

const { generateToken } = require('../utils/jwt');

const testtoken = generateToken(2983)
console.log(testtoken)

/////
function getUsers(req, res, next) {
  return User.find({})
    .then(users => {
      res.send(users)
    })
    .catch(next)
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
function createUser(req, res, next) {
  const { email, password, name, about, avatar } = req.body;
  if(!email || !password) {
    throw new BadRequest('Please enter a valid email or password');
  }
  //hash password before saving to database
  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        .then((user) => {
          if(!user) throw new BadRequest('Invalid User Data!');

          res.status(201).send({
            _id: user._id,
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar
          });
        })
        .catch(next);
    });
}

// function createUser(req, res, next) {
//   const { name, about, avatar, email, password } = req.body;
//
//   if (!email || !password){
//     return Promise.reject(new NotFound('email or password invalid'));
//   }
//   //check to see if email already exists
//   return User.findOne({ email }).then((user) => {
//     if (user) return Promise.reject(new BadRequest ('Email already exists'));
//
//     // hashing the password
//     bcrypt
//       .hash(req.body.password, 10)
//       .then((hash) =>
//         User.create({
//           name,
//           about,
//           avatar,
//           email,
//           password: hash,
//         })
//       )
//       .then((user) => res.status(200).send(user))
//       .catch(next);
//   });
// }

/////
function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {throw new NotFound('This User does not exist!')}

      const token = generateToken(user._id)

      res.send({ token });
    })
    .catch((err) => {
      if (res.status(401)) {
        next(new Unauthorized('Incorrect email or password'));
      } else next(err);
    });
}

/////
function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if(!user) throw new NotFound('Current User not found!');
      res.send({ data: user});
    })
    .catch(next);
}

/////
function updateProfile(req, res, next) {
  return User.findByIdAndUpdate(
      req.user._id,
      {name: req.body.name,about: req.body.about},
      {new: true, runValidators: true}
    )
    .then((profile) => {
      if(!profile) throw new NotFounded('Profile Update: Not a valid profile ID');

      return res.status(200).send({ data: profile });
    })
    .catch(next);
}

/////
function updateAvatar(req, res, next) {
  return User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true })
    .then((userAvatar) => {
      if(!userAvatar) throw new NotFounded('Avatar Update: Not a valid profile ID');

      return res.status(200).send({data: userAvatar});
    })
    .catch(next);
}

module.exports = {getSingleUser, getUsers, createUser, updateProfile, updateAvatar, getCurrentUser, login}
