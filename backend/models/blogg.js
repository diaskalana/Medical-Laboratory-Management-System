const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bloggSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default:'admin'
  },
  resources: {
    type: String,
    required: true,
  },
});

const blogg = mongoose.model("Blogg", bloggSchema);

module.exports = blogg;
