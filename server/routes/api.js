const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const Comments = require("../models/comments");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/api/user/:username", (req, res) => {
  User.findOne({ username: req.params.username }, (err, foundUser) => {
    if (err || !foundUser)
      return res.status(400).json({ msg: "no user found for that username" });
    const userObj = {
      "first name": foundUser.firstName,
      "last name": foundUser.lastName,
      email: foundUser.email,
      address: foundUser.address,
      city: foundUser.city,
      state: foundUser.state,
      created: foundUser.created,
      photo: foundUser.image,
      //   posts: foundUser.posts.length,
    };
    res.status(200).json(userObj);
  });
});

router.get("/api/user/:username/posts", (req, res) => {
  User.findOne({ username: req.params.username })
    .populate({
      path: "posts",
      model: Post,
      populate: [
        {
          path: "b",
          model: Post,
        },
        {
          path: "comments",
          model: Comments,
        },
      ],
    })
    .exec((err, foundUser) => {
      if (err || !foundUser)
        return res.status(400).json({ msg: "no user found for that username" });
      const postObj = {
        ...foundUser.posts,
        //   "first name": foundUser.firstName,
        //   "last name": foundUser.lastName,
        //   email: foundUser.email,
        //   address: foundUser.address,
        //   city: foundUser.city,
        //   state: foundUser.state,
        //   created: foundUser.created,
        //   photo: foundUser.image,
        //   posts: foundUser.posts.length,
      };
      res.status(200).json(postObj);
    });
});

router.get("/api/comment/:postID", (req, res) => {
  console.log(req.query);
  console.log(req.params);

  Post.findById(req.params.postID)
    .populate("comments")
    .exec((err, foundPost) => {
      if (!foundPost) return res.status(400).send({ msg: "no post found " });
      const comment = {
        text: req.query.comment,
        author: {
          id: "602cf5e604865a30ab6522e5",
          username: req.query.username,
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

  //   User.findOne({ username: req.params.username })
  //     .populate("posts")
  //     .populate("commennts")
  //     .exec((err, foundUser) => {
  //       if (err || !foundUser)
  //         return res.status(400).json({ msg: "no user found for that username" });

  //       res.status(200).json(foundUser);
  //     });
});

module.exports = router;
