const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const User = require("../models/user");
const Token = require("../models/token");
const { cloudinary } = require("../utills/cloudinary.js");
const auth = require("../middleware/auth");
const router = express.Router();
// require("dotenv").config();

router.post("/signup", (req, res) => {
  console.log("registration started");
  const { email, firstName, lastName, username, password } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const newUser = new User({
    email,
    firstName,
    lastName,
    username,
    registerd_ip_address: ip,
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

router.post("/updatePassword", (req, res) => {
  const { password, token } = req.body;
  Token.findOne({ token: token }, (err, foundToken) => {
    if (!foundToken) {
      return res.status(400).send({ msg: "your token may have expired" });
    }
    User.findOne({ _id: foundToken._userId }, (err, foundUser) => {
      if (!foundUser)
        return res.status(400).send({ msg: "no user found for this token" });
      foundUser.setPassword(password, (err, user) => {
        if (err) return res.status(500).send({ msg: err.message });
        user.save();
        res.status(200).send("password changed");
      });
    });
  });
});

router.post("/verify", (req, res) => {
  const { email, token } = req.body;
  console.log(email);
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

router.post("/confirmPasswordToken", (req, res) => {
  const { token } = req.body;
  console.log(token);
  Token.findOne({ token: token }, (err, foundToken) => {
    console.log(foundToken);
    if (!foundToken) {
      return res.status(400).send({ msg: "your token may have expired" });
    }
    return res.status(200).send({ msg: "token exists" });
    // User.findOne(
    //   { _id: foundToken._userId },
    //   (err, foundUser) => {
    //     if (!foundUser)
    //       return res.status(400).send({ msg: "no user found for this token" });
    //     foundUser.isVerified = true;
    //     foundUser.save((err) => {
    //       if (err) return res.status(500).send({ msg: err.message });
    //       res.status(200).send("email has been verified");
    //     });
    //   }
    // );
  });
});

router.post("/forgot", (req, res) => {
  const { email } = req.body;
  console.log(email, "ok");
  User.findOne({ email: email }, (err, foundUser) => {
    if (!foundUser) return res.status(400).send("no user found for this email");

    const token = new Token({
      _userId: foundUser._id,
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
          to: email,
          subject: "Reset password",
          text: `click this link to reset password.
             http://localhost:3000/reset?token=${token.token}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent:  ${info.response}`);
            res.status(200).send({ msg: "sent" });
          }

          // res.redirect("/verify");
        });
      }
    });
  });
});

router.get("/user", (req, res) => {
  console.log("getting user ...");
  res.status(200).send(req.user);
});

router.get("/logout", (req, res) => {
  console.log("logging out...");
  req.logOut();
  res.status(200).send({ msg: "logged out" });
});

router.post("/login", (req, res, next) => {
  // console.log(req.ip);
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  // console.log(ip); // ip address of the user

  console.log(req.ip);
  passport.authenticate("local", function (err, user) {
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
      user.last_login_date = Date.now();
      user.last_login_ipaddress = ip;
      user.save();
      res.status(200).send({ msg: "logged in", user: req.user });
    });
  })(req, res, next);
});

router.put("/update", auth.isAuthenticated, function (req, res) {
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

router.post("/upload", auth.isAuthenticated, (req, res) => {
  User.findById(req.user._id, async (err, foundUser) => {
    if (err) {
      res.status(400).send({ msg: "no user found" });
    } else {
      // res.status(200).send(updateduser);
      try {
        console.log("started");
        const fileStr = JSON.parse(req.body.data);
        const uploadImage = await cloudinary.uploader.upload(fileStr, {
          upload_preset: "profile_pic",
        });
        foundUser.image = uploadImage.secure_url;
        foundUser.save();
        res.status(200).send("profile picture updated");
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
      }
    }
  });
});
module.exports = router;
