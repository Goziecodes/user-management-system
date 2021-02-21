const User = require("../models/user");

const middleware = {};

middleware.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(400).json({ msg: " access denied" });
    }
  } else {
    res.status(400).json({ msg: " access denied" });
  }
};

middleware.isVerified = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isVerified === true) {
      next();
    } else {
      res.status(400).json({ msg: "verify your email" });
    }
  }
};

middleware.isBlocked = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.blocked === false) {
      next();
    } else {
      res.status(400).json({ msg: "user blocked" });
    }
  }
};

middleware.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(400).json({ msg: "please login" });
  }
};

module.exports = middleware;
