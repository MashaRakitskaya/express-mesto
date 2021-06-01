const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards =>res.status(200).send(cards))
  .catch((err) =>{
    res.status(500).send({ message: 'Ошибка' })
  });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) =>{
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректный данные' })
        return;
      }
      res.status(500).send({ message: 'Ошибка' })

    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
  .orFail(() => {
    return res.status(404).send({message:"Карточка с указанным _id не найдена."})
  })
  .then((card) => res.status(200).send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true }
)
.orFail(() => {
  return res.status(404).send({message:"Карточка с указанным _id не найдена."})
})
.then((card) => res.status(200).send({ data: card }))
.catch(err => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true }
)
.orFail(() => {
  return res.status(404).send({message:"Карточка с указанным _id не найдена."})
})
.then((card) => res.status(200).send({ data: card }))
.catch(err => res.status(500).send({ message: 'Ошибка' }));
};