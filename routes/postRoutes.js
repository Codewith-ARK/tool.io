const express = require("express");
const router = express.Router();
const path = require("path");
const posts = require("../utils/postViews");
const postController = require("../DB/postController");
const { verifyToken } = require("../utils/token");

router.get("/new", verifyToken, (req, res) => {
  res.send(posts.create());
});

router.post("/new", verifyToken, async (req, res) => {
  const postData = {
    title: req.body.title,
    desc: req.body.desc || "",
    url: req.body.url,
  };

  try {
    const newPost = await postController.createPost(postData);
    res.redirect("/post/view/all");
    // res.status(200).json({ message: "Post created successfully.", newPost });
  } catch (err) {
    res.status(500).json({ message: "Error creating post:", err });
  }
});

// router.get("/view/:id", (req, res)=>{
//   // code
// });

router.get("/view/all", async (req, res) => {
  try {
    const allPosts = await postController.getAllPosts();
    res.send(posts.viewAll(allPosts));
  } catch (err) {
    console.log(err);
    res.json({ message: "Error creating post:", err });
  }
});

router.get("/test", verifyToken, async (req, res) => {
  try {
    const numRemoved = await postController.removeAllPosts();
    res.status(200).json({ message: "No. of posts removed:", numRemoved });
  } catch (err) {
    res.status(500).json({ message: "Error creating post:", err });
  }
});

module.exports = router;
