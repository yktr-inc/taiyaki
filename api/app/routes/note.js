const express = require('express');
const Note = require('../models/note');
const Category = require('../models/category');

const router = express.Router();

router
  .get('/', async function(req, res) {
    const payload = {
      user: req.user,
    }

    if(typeof req.query.cat !== 'undefined'){
      const data = await Category.find({label: req.query.cat}).exec();
      payload.category = data[0]._id;
    }

    Note.find({
      ...payload,
    }).then(data => res.json(data));

  })
  .get('/shared', function(req, res) {
    Note.find({
      'collaborators._id': req.user._id
    }).then(data => res.json(data));
  })
  .post('/', (req, res) => {
    const { content } = req.body;
    const note = new Note({
      ...req.body,
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
  .delete('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user === req.user._id) {
      note.remove().then(() => res.sendStatus(204));
    } else {
      note.update({
        $pull: {
          collaborators: {
            _id: req.user._id
          }
        }
      }).then(() => res.sendStatus(204));
    }
  });

module.exports = router;
