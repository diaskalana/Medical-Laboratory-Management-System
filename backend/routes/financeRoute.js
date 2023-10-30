const express = require("express");
const router = express.Router();

const financeController = require("../controllers/financeCtrl");

// User Routes
router.post("/login", financeController.login);
router.post("/register", financeController.register);

// Transaction Routes
router.post("/add-transaction", financeController.addTransaction);
router.post("/edit-transaction", financeController.editTransaction);
router.post("/delete-transaction", financeController.deleteTransaction);
router.post("/get-all-transactions", financeController.getAllTransactions);

module.exports = router;
