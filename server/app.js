const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
passport = require("passport");
const dotenv = require("dotenv").config();

LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();

mongoose
  .connect(`mongodb://localhost:27017/user-management`, {
    useNewUrlParser: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

app.use(
  require("express-session")({
    secret: "netapss user management system",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
