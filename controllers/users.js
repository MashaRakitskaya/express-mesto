const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users =>res.status(200).send(users))
  .catch((err) =>{
    res.status(500).send({ message: 'Ошибка' })
  });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
  .orFail(new Error('NotValidId'))
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.message === 'NotValidId') {
     return res.status(404).send({ message: 'Нет пользователя с таким _id' });
    } else if(err.kind === "ObjectId") {
     return res.status(400).send({ message: 'Невалидный id'})
    }
    res.status(500).send({ message: 'Ошибка' });
  });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  .then((user) => {
    return res.status(201).send(user)
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректный данные' })
      return;
    }
    res.status(500).send({ message: 'Ошибка' })
  })
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
  .orFail(() => {
    return res.status(404).send({message:"Нет пользователя с таким _id"})
  })
  .then((user) => res.status(200).send({ data: user }))
  .catch(err => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректный данные' })
      return;
    }
    res.status(500).send({ message: 'Ошибка' })
  })
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id, { avatar }, { runValidators: true, new: true },
  )
  .orFail(() => {
    return res.status(404).send({message:"Нет пользователя с таким _id"})
  })
  .then((user) => res.status(200).send({ data: user }))
  .catch(err => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректный данные' })
      return;
    }
    res.status(500).send({ message: 'Ошибка' })
  })
};