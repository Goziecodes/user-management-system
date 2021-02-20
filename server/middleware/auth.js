const User = require("../models/user");

const middleware = {};

middleware.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.user._id, function (err, foundUser) {
      if (err) {
        res.status(400).json({ msg: "something went wrong" });
      } else {
        if (foundUser.role === "admin" || req.user.role === "admin") {
          next();
        } else {
          res.redirect("/");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};
