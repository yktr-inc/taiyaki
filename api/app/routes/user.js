const express = require('express');
const User = require('../models/user');

const router = express.Router();

router
  .get('/', function(req, res) {
    User.find({ _id: { $ne: req.user._id } }).select({ id: 1, username: 1 }).then(data => res.json(data));
  });

module.exports = router;
