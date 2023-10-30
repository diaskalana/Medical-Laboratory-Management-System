const express = require("express");
const router = express.Router();
const labReportController = require("../controllers/labReportCtrl");

// Lab Report Routes
router.post("/add", labReportController.addLabReport);
router.get("/", labReportController.getAllLabReports);
router.put('/update/:id', labReportController.updateLabReport);
router.delete("/delete/:id", labReportController.deleteLabReport);
router.get("/get/:id", labReportController.getLabReportById);

module.exports = router;
