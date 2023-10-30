const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  items: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
