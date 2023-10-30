const { Appoinment } = require("../models/appoinment-model");

//add appoinment details
const addAppoinment = async (req, res) => {
  const appoinment = new Appoinment(req.body);

  console.log("req.body", req.body);

  await appoinment.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

//retrieve appoinment details
const getAppoinments = async (req, res) => {
  await Appoinment.find().exec(function (err, appoinment) {
    if (err) {
      console.log("Error retrieving");
    } else {
      res.json(appoinment);
    }
  });
};

//retrieve single appoinment details
const getAppoinment = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const appoinment = await Appoinment.findById(id);
    if (!appoinment) {
      return res.status(404).json({ error: "Appoinment not found" });
    }
    res.json(appoinment);
  } catch (error) {
    console.error("Error retrieving appoinment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update appoinment details
const updateAppoinment = async (req, res) => {
  const { name, mail, doctor, payment, mobile, date, time } = req.body;

  const appoinmentId = req.params.id;
  let appoinment;
  try {
    appoinment = await Appoinment.findById(appoinmentId);
  } catch (err) {
    console.log("Error updating");
  }
  if (!appoinment) {
    return res
      .status(404)
      .json({ success: false, message: "Appointment not found" });
  }

  // Update appointment properties
  appoinment.name = name;
  appoinment.mail = mail;
  appoinment.doctor = doctor;
  appoinment.payment = payment;
  appoinment.mobile = mobile;
  appoinment.date = date;
  appoinment.time = time;

  await appoinment.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

//delete appoinment details
const deleteAppoinment = async (req, res) => {
  const appoinmentId = req.params.id;

  const appoinment = await Appoinment.findById(appoinmentId);
  if (!appoinment) {
    console.log("Error deleting" + appoinmentId);
  }
  await appoinment.remove((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

exports.addAppoinment = addAppoinment;
exports.getAppoinments = getAppoinments;
exports.getAppoinment = getAppoinment;
exports.updateAppoinment = updateAppoinment;
exports.deleteAppoinment = deleteAppoinment;
