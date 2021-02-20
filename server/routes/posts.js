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

router.post("/posts/:postID", (req, res) => {
  Post.findById(req.params.postID)
    .populate("comments")
    .exec((err, foundPosts) => {
      if (!foundPosts) return res.status(200).send({ msg: "no posts found " });
      return res.status(200).send(foundPosts);
    });
});

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

  User.findById(req.user._id, function (err, foundUser) {
    if (err) {
      res.status(400).send({ msg: "no user found" });
    } else {
      const newPost = {
        title,
        body,
        author: {
          id: req.user._id,
          username: req.user.username,
        },
      };
      Post.create(newPost, (err, newPost) => {
        if (err) {
          return res.status(400).send({ msg: err.message });
        }
        foundUser.posts.push(newPost);
        foundUser.save();
        res.status(200).send({ msg: "post created" });
      });
    }
  });
});

module.exports = router;
