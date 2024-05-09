 const express = require('express');
 const router = express.Router();
 const auth = require('../middlewares/auth');
 const userController  = require('../controllers/userController');

 router.post('/register', userController.register);
 router.post('/login', userController.login);
 router.post('/logout', auth, userController.logout);

 module.exports = router;