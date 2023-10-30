const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AppoinmetSchema = new Schema(
  {
    name: { type: String },
    mail: { type: String },
    doctor: { type: String },
    mobile: { type: Number },
    payment: { type: String },
    date: { type: String },
    time: { type: String },
  },
  {
    timestamps: true,
  }
);
 
const Appoinment = mongoose.model("appoinment", AppoinmetSchema);
module.exports = { Appoinment };