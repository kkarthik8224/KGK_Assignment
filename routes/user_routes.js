const express = require('express');
const { 
    login
  } = require('../controllers/user_controllers');

  const router = express.Router();

  router.post('/login', login);

  module.exports = router;