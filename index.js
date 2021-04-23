const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')

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

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/static')))

const {usersRouter} = require('./routes/users.js')
const {cardsRouter} = require('./routes/cards.js')


app.use((req, res, next) => {
  req.user = {
    _id: '5f825dab0d8e6ba76c15c74e'
  };
  next();
});

app.use('/', usersRouter)

app.use('/', cardsRouter)

app.use(function (req, res) {
  res.status(404).send({ message : " Requested Resource Not Found..." });
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})
