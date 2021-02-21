const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  //   createdAt: {
  //     type: Number,
  //     required: true,
  //   },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String },
  address: { type: String },
  image: { type: String },
  state: { type: String },
  city: { type: String },
  blocked: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  registerd_ip_address: { type: String },
  last_login_date: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  last_login_ipaddress: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
