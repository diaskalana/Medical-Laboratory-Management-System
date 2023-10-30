const router = require("express").Router();
const feedback = require("../models/feedback"); // Import the feedback model correctly

// Add feedback (http://localhost:8050/feedback/add)
router.route("/add").post((req, res) => {
  const {
    uId, // Retained as 'userId'
    userName,
    email,
    message,
    date,
    rate,
  } = req.body;

  const newFeedback = new feedback({
    uId,
    userName,
    email,
    date,
    message,
    rate,
  });

  newFeedback
    .save()
    .then(() => {
      res.json("Feedback Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to add feedback" }); // Add an error response
    });
});

// Fetch feedback (http://localhost:8050/feedback/)
router.route("/").get((req, res) => {
  feedback
    .find() // You should provide a query condition here if needed
    .then((feedbacks) => {
      res.json(feedbacks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch feedback" }); // Add an error response
    });
});

// Update feedback (http://localhost:8050/feedback/update)
router.route("/update/:Id").put(async (req, res) => {
  const feedbackId = req.params.Id;

  const {
    uId, // Retained as 'userId'
    userName,
    email,
    date,
    message,
    rate,
  } = req.body;

  const updateFeedback = {
    uId,
    userName,
    email,
    date,
    message,
    rate,
  };

  try {
    const updatedFeedback = await feedback.findByIdAndUpdate(
      feedbackId,
      updateFeedback,
      { new: true }
    );
    res
      .status(200)
      .json({ status: "Feedback updated", feedback: updatedFeedback });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error with updating data" });
  }
});

// Delete feedback (http://localhost:8050/feedback/:Id)
router.route("/delete/:Id").delete(async (req, res) => {
  const feedbackId = req.params.Id;

  try {
    await feedback.findByIdAndDelete(feedbackId);
    res.status(200).json({ status: "Feedback deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error with deleting data" });
  }
});

// Fetch feedback by ID (http://localhost:8050/feedback/get/:id)
router.route("/get/:id").get(async (req, res) => {
  const feedbackId = req.params.id; // Correct the parameter name to 'id'

  try {
    const fetchedFeedback = await feedback.findById(feedbackId);
    res
      .status(200)
      .json(fetchedFeedback);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error with fetching data" });
  }
});

module.exports = router;
