/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:  {
      validator: (v) => validator.isEmail(v, {
        require_tld: true,
        allow_utf8_local_part: false
      }),
      message: 'You must provide a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8
  },
  avatar: {
    type: String,
    required: true,
    default: "https://i.picsum.photos/id/77/600/600.jpg?hmac=RlDxta3N3D28rxmvJVQpbbo8apc9g9catCJlibP6oeg",
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'You must provide a valid URL'
    }
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
