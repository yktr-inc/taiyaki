const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const boom = require('express-boom');
const passport = require('passport');
require('dotenv').config();

const NoteRouter = require('./routes/note');
const UserRouter = require('./routes/user');
const AuthRouter = require('./routes/auth');

const app = express();
const port = 3000;

mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: process.env.DB_USENEWURLPARSER,
    dbName: process.env.DB_DBNAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(morgan(process.env.APP_ENV));
app.use(boom());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/', AuthRouter);
app.use('/notes', passport.authenticate('jwt', {session: false}), NoteRouter);
app.use('/users', passport.authenticate('jwt', {session: false}), UserRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
