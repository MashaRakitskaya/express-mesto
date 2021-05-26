const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Имя пользователя',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Информация о пользователе',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://images.unsplash.com/photo-1621769533563-d03ec387788f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80',
  }
});


module.exports = mongoose.model('user', userSchema);