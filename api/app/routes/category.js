const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router
  .get('/', function(req, res) {
    Category.find().then(data => res.json(data));
  })
  .post('/', (req, res) => {
    const { label } = req.body;

    const category = new Category({
      label,
      user: req.user,
    });

    category
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
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(movie =>
      res.json(movie)
    );
  })
  .delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(() => res.sendStatus(204));
  });

module.exports = router;
