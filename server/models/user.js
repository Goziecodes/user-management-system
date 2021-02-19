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
  role: { type: String, enum: ["admin", "user"], default: "user" },
  passwordResetToken: String,
  passwordResetExpires: Date,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
