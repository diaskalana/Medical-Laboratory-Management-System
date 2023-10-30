const router = require("express").Router();
const Blog = require("../models/blogg");

// Add blog (http://localhost:8050/blogs/add)
router.route("/add").post(async (req, res) => {
  try {
    const { title, blogContent, author, resources } = req.body;
    const newBlog = new Blog({
      title,
      blog: blogContent,
      author,
      resources,
    });
    await newBlog.save();
    res.json("Blog Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add blog" });
  }
});

// Fetch blogs (http://localhost:8050/blogs/)
router.route("/").get(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Update blog (http://localhost:8050/blogs/update/:id)
router.route("/update/:id").put(async (req, res) => {
  const blogId = req.params.id;
  const { title, blogContent, author, resources } = req.body;
  const updateBlog = {
    title,
    blog: blogContent,
    author,
    resources,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateBlog, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ status: "Blog updated", blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error with updating blog" });
  }
});

// Delete blog (http://localhost:8050/blogs/delete/:id)
router.route("/delete/:id").delete(async (req, res) => {
  const blogId = req.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ status: "Blog deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error with deleting blog" });
  }
});

// Fetch blog by ID (http://localhost:8050/blogs/get/:id)
router.route("/get/:id").get(async (req, res) => {
  const blogId = req.params.id;

  try {
    const fetchedBlog = await Blog.findById(blogId);

    if (!fetchedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(fetchedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error with fetching blog" });
  }
});

module.exports = router;
