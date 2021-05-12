/* eslint-disable prefer-template */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { celebrate, Joi, errors, Segments } = require('celebrate');
const path = require('path')
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middleware/auth');
const {requestLogger, errorLogger} = require('./middleware/logger');
const NotFound = require('./middleware/errors/NotFound.js')
const {login, createUser} = require('./controllers/userController');

const app = express();
// listen to port 3000
const { PORT = 3000 } = process.env;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }).unknown(true)
  }),
  createUser
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }).unknown(true)
  }),
  login
);

app.use(auth)
const {usersRouter} = require('./routes/users.js')
const {cardsRouter} = require('./routes/cards.js')


// app.use((req, res, next) => {
//   req.user = {
//     _id: '5f825dab0d8e6ba76c15c74e'
//   };
//   next();
// });

app.use(requestLogger)

app.use('/', usersRouter)
app.use('/', cardsRouter)

app.get('*', (req, res, next) => {
  next(new NotFound('Requested resource not found'));
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Error logging
app.use(errorLogger)
app.use(errors())

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

// Centralized error handling
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occured on the server' : message
  });

  next();
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})
