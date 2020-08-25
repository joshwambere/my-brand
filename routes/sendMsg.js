const express = require('express');
const Cont = require('../models/contacts');
const Contact = require('../controllers/contacts');
const router = express.Router();
const newContact = new Contact();

//send message
router.post('/mail', newContact.sendMsg);
  
  module.exports = router;