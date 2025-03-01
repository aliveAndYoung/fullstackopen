const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
        id: 1,
    });
    res.json(blogs);
});

router.post("/", async (req, res) => {
    const body = req.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: req.user.id,
    });

    const savedBlog = await blog.save();
    req.user.blogs = req.user.blogs.concat(savedBlog._id);
    await req.user.save();
    if (!savedBlog) {
        return res.status(400).json({ error: "Blog not saved" });
    }

    res.status(201).json(savedBlog);
});

router.delete("/:id", async (request, response) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
        return response.status(404).end();
    }

    if (blog.user.toString() !== request.user._id.toString()) {
        return response.status(403).json({
            error: "only the creator can delete this blog",
        });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).json({ message: "blog deleted" });
});

router.put("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true, runValidators: true }
    );

    if (!updatedBlog) {
        return res.status(404).end();
    }

    res.json(updatedBlog);
});

module.exports = router;
