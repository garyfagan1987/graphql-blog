const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  categoryId: String,
  description: String,
  imageUrl: String,
  name: String,
});

module.exports = mongoose.model('Post', postSchema);