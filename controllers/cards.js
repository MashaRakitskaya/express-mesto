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
  .orFail(
    () => {
      throw new Error()
    }
  )
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) =>{
    if(err.kind === "ObjectId") {
      const code = 404;
      const error = `Карточка с указанным _id не найдена!`;
      res.status(code).send({ messages: error })
    } else {
     res.status(500).send({ message: 'Ошибка' })
    }
  })
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true }
)
.orFail(
  () => {
    throw new Error()
  }
)
.then((card) => res.status(200).send({ data: card }))
.catch((err) =>{
  if(err.kind === "ObjectId") {
    const code = 404;
    const error = `Карточка с указанным _id не найдена`;
    res.status(code).send({ messages: error })
  } else {
   res.status(500).send({ message: 'Ошибка' })
  }
})
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true }
)
.orFail(
  () => {
    throw new Error()
  }
)
.then((card) => res.status(200).send({ data: card }))
.catch((err) =>{
  if(err.kind === "ObjectId") {
    const code = 404;
    const error = `Карточка с указанным _id не найдена`;
    res.status(code).send({ messages: error })
  } else {
   res.status(500).send({ message: 'Ошибка' })
  }
})
};