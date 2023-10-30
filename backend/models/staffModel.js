const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  NIC: {
    type: String,
  },
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  type: {
    type: String,
  },
  salary: {
    type: Number,
  },
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = { Staff };
