const Card = require('../models/card.js')
const BadRequest = require('../middleware/errors/BadRequest');
const NotFound = require('../middleware/errors/NotFound');
const Unauthorized = require('../middleware/errors/Unauthorized');

function getCards(req, res, next) {
  return Card.find({})
    .populate('owner')
    .then(cards => {
      res.status(200).send(cards)
    })
    .catch(next)
}

/////
function createCard(req, res) {
  const {name, link } = req.body
  Card.create({name, link, owner: req.user._id})
  .then((card) => {
      if (!card) {throw new BadRequest('Invalid Data for Card Creation!')}
      res.status(201).send(card);
    })
    .catch(next)
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
  .then((likeId) => {
      if (!likeId) {
        next(new NotFounded('This card does not exist.'));
      }

      res.status(200).send(likeId);
    })
    .catch(next);
}

/////
function dislikeCard(req, res){
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
  .then((unLikeId) => {
      if (!unLikeId) {
        throw new NotFounded('This card does not exist.');
      }

      res.status(200).send(unLikeId);
    })
    .catch(next);
}
module.exports = {getCards, createCard, deleteCard, likeCard, dislikeCard}
