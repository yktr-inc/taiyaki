const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const NoteRouter = require('./routes/note');
const app = express();
const port = 3000;

mongoose.connect('mongodb://mongo:27017', {
  useNewUrlParser: true,
  dbName: 'myDD',
  user: 'root',
  pass: 'password'
});

app.use(cors());
app.use(bodyparser.json());
app.use('/notes', NoteRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
