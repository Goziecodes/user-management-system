const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  createdAt: {
    type: Number,
    required: true,
  },
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
    required: true,
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
  role: { type: String, enum: ["admin", "user"] },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
