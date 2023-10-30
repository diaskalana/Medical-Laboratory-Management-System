const express = require("express");
const router = express.Router();
const PayrollController = require("../controllers/payroll-controller");

router.post("/add", PayrollController.addPayroll);
router.get("/get", PayrollController.getPayroll);
router.put("/update/:id", PayrollController.updatePayroll);
router.delete("/delete/:id", PayrollController.deletePayroll);
router.get("/get/:id", PayrollController.getPayrollById);

module.exports = router;
