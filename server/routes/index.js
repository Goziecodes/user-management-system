const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const User = require("../models/user");
const Token = require("../models/token");
const router = express.Router();

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
                  clientId:
                    "190767087066-sg2oilkjnip6qfjg6eul2ggol4bfjn7j.apps.googleusercontent.com",
                  clientSecret: "PcZYCITXSy9J7KOtxyU2TS0X",
                  refreshToken:
                    "1//04HuTuuq3_wsGCgYIARAAGAQSNwF-L9IrZ0ZxIoy9807d9mtgvDYs0B4LutXqhivcrWK7cYgarSi3UI4BM41bX-JtjM4Gwji9Xa0",
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

                res.redirect("/verify");
              });
            }
          });
        }
      });
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

module.exports = router;
