const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const router = express.Router();

router.get("/posts", (req, res) => {
  console.log("all post");
  Post.find({})
    .populate("comments")
    .exec((err, foundPosts) => {
      if (!foundPosts) return res.status(200).send({ msg: "no posts found " });
      return res.status(200).send(foundPosts);
    });
});
// router.get("/posts", (req, res) => {
//   console.log("all post");
//   Post.find({}, (err, foundPosts) => {
//     if (!foundPosts) return res.status(200).send({ msg: "no posts found " });
//     return res.status(200).send(foundPosts);
//   });
// });

router.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("comments")
    .exec((err, foundPosts) => {
      if (!foundPosts) return res.status(200).send({ msg: "no post found " });
      return res.status(200).send(foundPost);
    });
});

router.post("/posts", (req, res) => {
  console.log("started creating..");
  const { title, body } = req.body;
  const newPost = {
    title,
    body,
    author: {
      id: req.user._id,
      username: req.user.username,
    },
  };
  Post.create(newPost, (err, post) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    }
    res.status(200).send({ msg: "post created" });
  });
});

module.exports = router;
