const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  uId: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = feedback;
