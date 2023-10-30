const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PayrolltSchema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    endingDate: { type: String },
    grossPay: { type: Number },
    startingDate: { type: String },
    paymentDate: { type: String },
    totalHours: { type: Number },

  },
  {
    timestamps: true,
  }
);

const Payroll = mongoose.model("payroll", PayrolltSchema);
module.exports = { Payroll };