const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000
const routes = require('./routes/index.js');


mongoose.connect('mongodb://mongo:27017', {
  useNewUrlParser: true,
  dbName: 'myDD',
  user: 'root',
  pass: 'password'
});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

app.get('/', (req, res) => res.send(kitty));
app.get('*', (req, res) => res.send('Not found!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
