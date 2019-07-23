const express = require('express');
const Note = require('../models/note');

const router = express.Router();

router
  .get('/', function(req, res) {
    Note.find({
      user: req.user
    }).then(data => res.json(data));
  })
  .get('/shared', function(req, res) {
    console.log(req.user._id);
    Note.find({
      'collaborators._id': req.user._id
    }).then(data => res.json(data));
  })
  .post('/', (req, res) => {
    const { content } = req.body;

    const note = new Note({
      content,
      user: req.user,
    });

    note
      .save()
      .then(data => res.status(201).json(data))
      .catch(error => {
        if (error.name === 'ValidationError') {
          res.boom.badRequest(error.errors);
        } else {
          res.boom.internal();
        }
      });
  })
  .patch('/:id', async (req, res) => {
    const payload = req.body;
    if (payload.collaborator) {
      payload.$push = {
        collaborators: {
          _id: payload.collaborator
        }
      };
    }
    Note.findByIdAndUpdate(req.params.id, payload, { new: true }).then(movie =>
      res.json(movie)
    );
  })
  .delete('/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id).then(() => res.sendStatus(204));
  });

module.exports = router;
