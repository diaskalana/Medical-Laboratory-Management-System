const { Payroll } = require("../models/payroll-model");

//add payroll details
const addPayroll = async (req, res) => {
  const payroll = new Payroll(req.body);

  await payroll.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

// Retrieve payroll by ID
const getPayrollById = async (req, res) => {
  const payrollId = req.params.id;

  try {
    const payroll = await Payroll.findById(payrollId);

    if (!payroll) {
      return res
        .status(404)
        .json({ success: false, message: "Payroll not found" });
    }

    res.status(200).json({ success: true, payroll });
  } catch (err) {
    console.log("Error retrieving payroll by ID", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//retrieve payroll details
const getPayroll = async (req, res) => {
  await Payroll.find().exec(function (err, payroll) {
    if (err) {
      console.log("Error retrieving");
    } else {
      res.json(payroll);
    }
  });
};

//update payroll details
const updatePayroll = async (req, res) => {
  const {
    name,
    endingDate,
    id,
    grossPay,
    startingDate,
    paymentDate,
    totalHours,
  } = req.body;
  const payrollId = req.params.id;

  try {
    let payroll = await Payroll.findById(payrollId);

    if (!payroll) {
      return res
        .status(404)
        .json({ success: false, message: "Payroll not found" });
    }

    // Update payroll properties
    payroll.name = name;
    payroll.id = id;
    payroll.endingDate = endingDate;
    payroll.grossPay = grossPay;
    payroll.startingDate = startingDate;
    payroll.paymentDate = paymentDate;
    payroll.totalHours = totalHours;

    await payroll.save((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log("Error updating payroll", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//delete payroll details
const deletePayroll = async (req, res) => {
  const payrollId = req.params.id;

  const payroll = await Payroll.findById(payrollId);
  if (!payroll) {
    console.log("Error deleting");
  }
  await payroll.remove((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

exports.addPayroll = addPayroll;
exports.getPayroll = getPayroll;
exports.updatePayroll = updatePayroll;
exports.deletePayroll = deletePayroll;
exports.getPayrollById = getPayrollById;
