import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  socialMedia: String,
  images: [String],
});

export default mongoose.model("user", User);
