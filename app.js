
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use((req, res, next) => {
//   req.user = {
//     _id: '60ad37607cbc94b5a4e2f84a'
//   };

//   next();
// });

app.use(router);

app.listen(PORT, () => {
  console.log('сервер запущен');
})