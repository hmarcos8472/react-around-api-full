const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v, {
        require_tld: true,
        allow_utf8_local_part: false
      }),
      message: 'The email you used is invalid.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau'
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer'
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://i.imgur.com/jCEMu8X.jpg',
    validate: {
      validator: (v) => validator.isURL(v),
      message: "The submitted link is broken"
    }
  }
});

module.exports = mongoose.model('user', userSchema);
