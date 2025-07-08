const express = require('express');
const router = express.Router();
const { userLogin, userSignUp, getUser, getUsersCount } = require('../controllers/user.js');

router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.get('/single/:id', getUser);
router.get('/users-count', getUsersCount);

module.exports = router;