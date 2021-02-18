const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const Comments = require("../models/comments");
const router = express.Router();

router.post("/comment/:postID", (req, res) => {
  const { text } = req.body;
  Post.findById(req.params.postID)
    .populate("comments")
    .exec((err, foundPost) => {
      if (!foundPost) return res.status(200).send({ msg: "no post found " });
      const comment = {
        text,
        author: {
          id: req.user._id,
          username: req.user.username,
        },
      };
      Comments.create(comment, (err, newComment) => {
        if (err) {
          console.log(err);
        } else {
          foundPost.comments.push(newComment);
          foundPost.save();
          res.status(200).send(foundPost.comments);
        }
      });
    });
});

module.exports = router;
