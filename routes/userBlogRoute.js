const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const verifyJWT = require("../middlewares/jwt_verify");
// add a blog route
router.post("/add", verifyJWT, async (req, res) => {
  const {
    userid,
    title,
    description,
    createdtime,
    authorname,
    authorimageurl,
  } = req.body;

  const blogData = {
    userid: userid,
    title: title,
    description: description,
    createdtime: createdtime,
    authorimageurl: authorimageurl,
    authorname: authorname,
  };

  const blog = new Blog(blogData);
  try {
    const result = await blog.save();
    res.status(200).json({ msg: "Blog added successfully" });
  } catch (e) {
    res.status(500).json({ msg: "Could not add blog" });
  }
});
// get all blogs
router.get("/fetchAllBlogs", verifyJWT, async (req, res) => {
  const uId = req.headers.uid;
  const posts = [];

  try {
    const blogs = await Blog.find({ userid: { $ne: uId } });

    for (const blog of blogs) {
      const postData = {
        postid: blog._id,
        title: blog.title,
        description: blog.description,
        userid: blog.userid,
        createdtime: blog.createdtime,
        imageurl: blog.imageurl,
        authorname: blog.authorname,
        authorimageurl: blog.authorimageurl,
      };
      posts.push(postData);
    }

    res.status(200).json({ msg: posts });
  } catch (err) {
    res.status(500).json({ msg: "Could not fetch" });
  }
});
// get user specific blogs
router.get("/fetchUserBlogs", verifyJWT, async (req, res) => {
  const uId = req.headers.uid;
  const posts = [];

  try {
    const blogs = await Blog.find({ userid: uId });

    for (const blog of blogs) {
      const postData = {
        postid: blog._id,
        title: blog.title,
        description: blog.description,
        userid: blog.userid,
        createdtime: blog.createdtime,
        imageurl: blog.imageurl,
        authorname: blog.authorname,
        authorimageurl: blog.authorimageurl,
      };
      posts.push(postData);
    }

    res.status(200).json({ msg: posts });
  } catch (err) {
    res.status(500).json({ msg: "Could not fetch" });
  }
});
// delete blog
router.delete("/delete", verifyJWT, async (req, res) => {
  const { postid } = req.body;
  console.log(postid);
  try {
    const result = await Blog.findByIdAndDelete(postid);
    res.json({ msg: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Could not delete" });
  }
});
// update blog
router.post("/update", verifyJWT, async (req, res) => {
  try {
    const { postId, title, description, createdTime, imageUrl } = req.body;

    const post = await Blog.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        createdTime,
        imageUrl,
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not update" });
  }
});     
module.exports = router;
