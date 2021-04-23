const Card = require('../models/card.js')

function getCards(req, res) {
  return Card.find({})
    .populate('owner')
    .then(cards => {
      res.send(cards)
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
}

/////
function createCard(req, res) {
  const {name, link } = req.body
  Card.create({name, link, owner: req.user._id})
  .then(card => {res.send({data : card})})
  .catch((err) => {
    if (err.name === "ValidationError") {
      res.status(400).send({message : "Card validation failed"})
    } else {
      res.status(500).send({message : "Internal server error"})
    }
  })
}

/////
function deleteCard(req, res) {
  const { id } = req.params.cardId;
  return Card.deleteOne(id)
    .then(card => {
      res.status(200).send({card, message: "Card has been deleted"})
    })
    .catch((err) => {
     if (err.name = "CastError") {
       res.status(404).send({message: "The requested card does not exist"});
     }
     else {
       res.status(500).send({message: "500 Internal server error"})
     }
   })
}

/////
function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
}

/////
function dislikeCard(req, res){
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
}
module.exports = {getCards, createCard, deleteCard, likeCard, dislikeCard}
