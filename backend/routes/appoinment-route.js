const express = require("express");
const router = express.Router();
const ApponmentController = require("../controllers/appoinment-controller");

router.post("/add", ApponmentController.addAppoinment);
router.get("/get", ApponmentController.getAppoinments);
router.get("/get/:id", ApponmentController.getAppoinment);
router.put("/update/:id", ApponmentController.updateAppoinment);
router.delete("/delete/:id", ApponmentController.deleteAppoinment);

module.exports = router;
