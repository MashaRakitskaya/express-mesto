const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards =>res.status(200).send(cards))
  .catch((err) =>{
    res.status(500).send({ message: 'Ошибка' })
  });
};

module.exports.createCard = (req, res) => {
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) =>{
      res.status(500).send({ message: 'Ошибка' })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (req.user._id.toString()) {
        card.remove();
        res.status(200).send({ message: 'Карточка удолена' });
      }
    })
    .catch((err) =>{
      console.log("Was error", err);
      res.status(500).send({ message: 'Ошибка' })
    });
};