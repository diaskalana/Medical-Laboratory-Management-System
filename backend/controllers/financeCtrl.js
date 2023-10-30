const { User, Transaction } = require("../models/financeModel");
var moment = require("moment");

// User Controller Functions
const login = async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (result) {
      res.send(result);
    } else {
      res.status(500).json("Error");
    }
  } catch (error) {
    res.status(500).json("Error");
  }
};

const register = async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(500).json("Error");
  }
};

// Transaction Controller Functions
const addTransaction = async (req, res) => {
  try {
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction added successfully");
  } catch (error) {
    res.status(500).json("Error");
  }
};

const editTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.send("Transaction updated successfully");
  } catch (error) {
    res.status(500).json("Error");
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.send("Transaction updated successfully");
  } catch (error) {
    res.status(500).json("Error");
  }
};

const getAllTransactions = async (req, res) => {
  console.log("get-all-transactions");
  const { frequency, selectedRange, type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json("Error");
  }
};

module.exports = {
  login,
  register,
  addTransaction,
  editTransaction,
  deleteTransaction,
  getAllTransactions,
};
