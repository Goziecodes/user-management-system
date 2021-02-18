const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const User = require("../models/user");
const Token = require("../models/token");
const router = express.Router();
// require("dotenv").config();

router.get("/", (req, res) => {
  res.send("welcome");
});
router.post("/a", (req, res) => {
  console.log("kl");
  res.status(200).send("ok");
  // res.redirect("/");
});

router.post("/signup", (req, res) => {
  console.log("registration started");
  const { email, firstName, lastName, username, password } = req.body;
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
        } else {
          const token = new Token({
            _userId: createdUser._id,
            token: crypto.randomBytes(16).toString("hex"),
          });

          token.save((err) => {
            if (err) {
              console.log(err);
            } else {
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  type: "oauth2",
                  user: "ezechukwuchigozie@gmail.com",
                  clientId: process.env.CLIENTID,
                  clientSecret: process.env.CLIENTSECRET,
                  refreshToken: process.env.REFRESHTOKEN,
                },
                from: "ezechukwuchigozie@gmail.com",
              });

              const mailOptions = {
                from: "ezechukwuchigozie@gmail.com",
                to: createdUser.email,
                subject: "Verify email",
                text: `use this token to verify your email ${token.token}`,
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log(`Email sent:  ${info.response}`);
                }
                res.status(200).send({ msg: "verify email" });

                // res.redirect("/verify");
              });
            }
          });
        }
      });
    } else {
      res.status(400).send({ msg: "user already exists" });
    }
  });
});

router.post("/verify", (req, res) => {
  const { email, token } = req.body;
  Token.findOne({ token: token }, (err, foundToken) => {
    if (!foundToken)
      return res.status(400).send({ msg: "your token may have expired" });

    User.findOne(
      { _id: foundToken._userId, email: email },
      (err, foundUser) => {
        if (!foundUser)
          return res.status(400).send({ msg: "no user found for this token" });
        foundUser.isVerified = true;
        foundUser.save((err) => {
          if (err) return res.status(500).send({ msg: err.message });
          res.status(200).send("email has been verified");
        });
      }
    );
  });
});

router.get("/user", (req, res) => {
  res.status(200).send(req.user);
});
router.get("/logout", (req, res) => {
  req.logOut(user, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send({ msg: "logged out" });
  });
});

router.post("/login", (req, res, next) => {
  console.log(req.body, "credentials");
  passport.authenticate("local", function (err, user, info) {
    console.log(user);
    console.log(info);
    console.log(err);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({ msg: "NO user found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log("created");
      res.status(200).send({ msg: "logged in", user: req.user });
    });
  })(req, res, next);
});

router.put("/update", function (req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, function (err, updateduser) {
    if (err) {
      res.status(400).send({ msg: "no user found" });
    } else {
      res.status(200).send(updateduser);

      // User.findById(req.params.id, function (err, foundUser) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     res.status(200).send(foundUser);
      //   }
      // });
    }
  });
});
module.exports = router;
