const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/admin", auth.isAdmin, (req, res) => {
  console.log("getting users ...");
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.json({ msg: "no users found" });
    }
    res.status(200).send(users);
  });
});

router.get("/admin/user/:id", auth.isAdmin, (req, res) => {
  console.log("getting user ...");
  User.findById(req.params.id)
    .populate("posts")
    .exec((err, users) => {
      if (err) {
        console.log(err);
        res.json({ msg: "no users found" });
      }
      res.status(200).send(users);
    });
});

router.put("/admin/block/:id", auth.isAdmin, function (req, res) {
  User.findByIdAndUpdate(req.params.id, { blocked: true }, function (err) {
    if (err) {
      res.status(400).send({ msg: "something went wrong" });
    } else {
      res.status(200).send({ msg: "user blocked" });
    }
  });
});
router.put("/admin/unblock/:id", auth.isAdmin, function (req, res) {
  User.findByIdAndUpdate(req.params.id, { blocked: false }, function (err) {
    if (err) {
      res.status(400).send({ msg: "something went wrong" });
    } else {
      res.status(200).send({ msg: "user unblocked" });
    }
  });
});

router.put("/admin/edit/:id", auth.isAdmin, function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) {
      res.status(400).send({ msg: "something went wrong" });
    } else {
      res.status(200).send({ msg: "user details updated" });
    }
  });
});

module.exports = router;
