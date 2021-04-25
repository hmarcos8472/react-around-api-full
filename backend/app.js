const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')

const {usersRouter} = require('./routes/users.js')
const {cardsRouter} = require('./routes/cards.js')

const {createUser, login} = require('./controllers/userController.js')

const helmet = require('helmet')
const cors = require('cors')
const { celebrate, Joi, errors, Segments } = require('celebrate');

const auth = require('./middleware/auth.js')
const {requestLogger, errorLogger} = require('./middleware/logger.js')

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// listen to port 3000
const { PORT = 3000 } = process.env;

const path = require('path')

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(helmet())
app.use(auth)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/static')))

app.use(requestLogger)

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }).unknown(true)
  }),
  createUser
);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }).unknown(true)
  }),
  login
);

app.use('/', usersRouter)
app.use('/', cardsRouter)

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(errorLogger)
app.use(errors())

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occured on the server' : message
  });

  next();
});

app.use(function (req, res) {
  res.status(404).send({ message : " Requested Resource Not Found..." });
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})
