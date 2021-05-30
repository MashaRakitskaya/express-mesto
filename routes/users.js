const router = require('express').Router();
const { getUsers, getUserId, createUser, updateUser, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserId);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;