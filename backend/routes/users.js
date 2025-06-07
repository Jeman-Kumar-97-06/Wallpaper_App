const express = require('express');
const router  = express.Router();

const {
    googleLogin,
    loginUser,
    signupUser
}             = require('../controllers/usersControllers');

router.post('/google-login',googleLogin);
router.post('/login',loginUser);
router.post('/signup',signupUser);

module.exports = router;