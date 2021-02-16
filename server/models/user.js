const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  //   createdAt: {
  //     type: Number,
  //     required: true,
  //   },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: { type: String, unique: true },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  blocked: {
    type: Boolean,
  },
  verified: {
    type: Boolean,
  },
  role: { type: String, enum: ["admin", "user"] },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
