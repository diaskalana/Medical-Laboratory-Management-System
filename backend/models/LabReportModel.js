const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labReportSchema = new Schema(
  {
    // id: {
    //     type: Number,
    //     required: true,
    // },
    patientName: {
      type: String,
      required: true,
    },
    patientPhone: {
        type: Number,
        required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctorEmail: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  
  

);

const LabReport = mongoose.model("LabReport", labReportSchema);
module.exports = {LabReport};
