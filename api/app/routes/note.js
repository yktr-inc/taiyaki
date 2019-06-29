const express = require('express');
const Note = require('../models/note');

const router = express.Router();

router
  .get('/', function(req, res) {
    Note.find().then(data => res.json(data));
  })
  .post('/', (req, res) => {
    const note = new Note(req.body);

    note
      .save()
      .then(data => res.status(201).json(data))
      .catch(error => {
        if (error.name === 'ValidationError') {
          res.status(400).json(error.errors);
        } else {
          res.sendStatus(500);
        }
      });
  })
  .patch('/:id', async (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(movie =>
      res.json(movie)
    );
  })
  .delete('/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id).then(() => res.sendStatus(204));
  });

module.exports = router;
