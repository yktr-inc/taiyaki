const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router
  .post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then(user => {
        if (!user) {
          res.boom.badRequest('No Account Found');
        }
        user.comparePassword(password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user._id,
                name: user.username
              };
              jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({
                      error: "Error signing token",
                      raw: err
                    });
                  }
                  return res.status(200).json({token});
                });
            } else {
              return res.boom.badRequest('Password incorrect');
            }
          })
          .catch((e) => {
            return res.boom.boomify(e);
          })
        ;
      });
  })
  .post('/register', function(req, res) {
    const { username, password } = req.body;
    const user = new User({username, password});

    user.save((err) => {
      if (err) {
        return res.boom.badRequest('Email already used');
      }
      res.status(201).json(user);
    })
  })
;

module.exports = router;
