const express  = require('express');
const router = express.Router();
const User = require('../controllers/users');
const newUser = new User();
router.post('/users', newUser.signUp);

//sign in
router.post('/users/signin', newUser.signIn);

module.exports = router;