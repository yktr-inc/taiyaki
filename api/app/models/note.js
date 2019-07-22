const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  collaborators: [new Schema()],
  color: String,
});

module.exports = mongoose.model('Note', NoteSchema);
