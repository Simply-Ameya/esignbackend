const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    phone: { type: Number, required: true, min: 10 },
    gender: { type: String, required: true },
    status: { type: String },
    profilePicture: { type: String },
    password: { type: String, required: true, min: 6, max: 20 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
