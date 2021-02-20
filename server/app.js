const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
passport = require("passport");
const dotenv = require("dotenv").config();
LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const User = require("./models/user");
const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const adminRoutes = require("./routes/admin");

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  require("express-session")({
    secret: "netapss user management system",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose
  .connect(`mongodb://localhost:27017/user-management`, {
    useNewUrlParser: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
