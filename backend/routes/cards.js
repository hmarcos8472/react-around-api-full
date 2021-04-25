const express = require('express')
const {celebrate, Joi} = require('celebrate')
const cardsRouter = express.Router()

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cardController.js')

cardsRouter.get('/cards', getCards)

cardsRouter.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().uri().required()
    })
  }),
  createCard
)

cardsRouter.delete('cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required()
    })
  }),
  deleteCard
);

cardsRouter.put(
  'cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required()
    })
  }),
  likeCard
);

cardsRouter.delete(
  'cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required()
    })
  }),
  dislikeCard
);

module.exports = {cardsRouter}
