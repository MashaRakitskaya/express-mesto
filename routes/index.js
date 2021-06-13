const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/
    ),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

router.post('/signup', validateUserSignup, createUser);
router.post('/signin', validateSignin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

module.exports = router;
