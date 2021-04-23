const express = require('express')

const cardsRouter = express.Router()

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cardController.js')

cardsRouter.get('/cards', getCards)
cardsRouter.post('/cards', createCard)
cardsRouter.delete('/cards/:cardId', deleteCard)
cardsRouter.put('/cards/:cardId', likeCard)
cardsRouter.delete('/cards/:cardId', dislikeCard)

module.exports = {cardsRouter}
