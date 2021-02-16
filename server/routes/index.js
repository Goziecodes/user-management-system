const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.post("/signup", (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;
  console.log(req.body);
  const newUser = new User({
    email,
    firstName,
    lastName,
    username,
  });

  User.findOne({ email: email }, (err, foundUser) => {
    if (!foundUser) {
      User.register(newUser, password, (err, createdUser) => {
        if (err) {
          console.log(`error:${err.message}`);
        } else console.log(createdUser);
      });
    }
  });

  //   console.log(email, "im here");
});

module.exports = router;
