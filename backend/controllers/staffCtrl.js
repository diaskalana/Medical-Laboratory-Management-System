const { Staff } = require("../models/staffModel");

// Employee Login
const login = (req, res) => {
  const { NIC, password } = req.body;

  Staff.findOne({ NIC, password }, (err, foundEmployee) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    if (!foundEmployee) {
      return res.status(400).json({
        success: false,
        error: "Invalid NIC or password",
      });
    }

    return res.status(200).json({
      success: true,
      employee: foundEmployee,
    });
  });
};

// Create a new post
const createPost = (req, res) => {
  let emp = new Staff(req.body);
  emp.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: emp,
    });
  });
};

// Get all posts
const getAllPosts = (req, res) => {
  Staff.find().exec((err, employee) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPosts: employee,
    });
  });
};

// Update a post
const updatePost = (req, res) => {
  Staff.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated successfully",
      });
    }
  );
};

// Delete a post
const deletePost = (req, res) => {
  Staff.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete successful",
      deletedPost,
    });
  });
};

// Get a specific post by ID
const getPostById = (req, res) => {
  let postId = req.params.id;
  Staff.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
};

module.exports = {
  login,
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
};
