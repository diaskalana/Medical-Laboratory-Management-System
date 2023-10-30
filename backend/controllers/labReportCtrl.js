const {LabReport} = require("../models/LabReportModel");
const mongoose = require('mongoose');

const addLabReport = async (req, res) => {
  try {
    const { description, pname, phone, dname, email } = req.body;
    const newLabReport = new LabReport({
      description,
      patientName: pname,
      patientPhone: phone,
      doctorName: dname,
      doctorEmail: email,
    });

    console.log("Added Lab Report:", newLabReport);

    await newLabReport.save();
    res.json("Lab Report Added");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllLabReports = async (req, res) => {
  try {
    const labreports = await LabReport.find();
    res.json(labreports);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateLabReport = async (req, res) => {
  try {
    const id = req.params.id;
    const { pname, phone, dname, email, description } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Lab Report ID' });
    }

    const updatedLabReport = await LabReport.findByIdAndUpdate(
      id,
      {
        description,
        patientName: pname,
        patientPhone: phone,
        doctorName: dname,
        doctorEmail: email,
      },
      { new: true }
    );

    if (!updatedLabReport) {
      return res.status(404).json({ message: 'Lab Report not found' });
    }

    res.json(updatedLabReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteLabReport = async (req, res) => {
  try {
    const id = req.params.id;
    await LabReport.findByIdAndDelete(id);
    res.status(200).json({ status: "Lab Report deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with delete lab report", error: err.message });
  }
};

const getLabReportById = async (req, res) => {
  try {
    const id = req.params.id;
    const labreport = await LabReport.findById(id);
    res.status(200).json({ status: "Lab Report fetched", labreport });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with get lab report", error: err.message });
  }
};

module.exports = {
  addLabReport,
  getAllLabReports,
  updateLabReport,
  deleteLabReport,
  getLabReportById,
};
