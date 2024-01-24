const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router;
