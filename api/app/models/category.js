const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  label: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

CategorySchema.pre('validate', function(doc) {
  console.log(doc);
  return doc;
});

module.exports = mongoose.model('Category', CategorySchema);
