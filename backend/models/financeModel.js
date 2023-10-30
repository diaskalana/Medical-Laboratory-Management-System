const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const User = mongoose.model("Users", userSchema);
const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = { User, Transaction };
