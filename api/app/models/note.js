const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  content: String,
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;