const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffCtrl");

// Staff Routes
router.post("/login", staffController.login);
router.post("/post", staffController.createPost);
router.get("/posts", staffController.getAllPosts);
router.put("/post/:id", staffController.updatePost);
router.delete("/post/:id", staffController.deletePost);
router.get("/post/:id", staffController.getPostById);

module.exports = router;
