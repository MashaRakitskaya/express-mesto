const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users =>res.status(200).send(users))
  .catch((err) =>{
    console.log("Was error", err);
    res.status(500).send({ message: 'Ошибка' })
  });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
  .then((user) => {if(user) {
    return res.status(200).send(user)
  }
  return res.status(400).send({message:"Нет пользователя с таким айди"})
})
  .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.createUser = (req, res) => {
  User.create({ name, about, avatar })
  .then((user) => {
    return res.status(201).send(user)
  })
  .catch(() => res.status(500).send({ message: 'Ошибка' }))
}