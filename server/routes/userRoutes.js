import express from "express";
import User from "../model/User.js";
import { upload } from "../utils/upload.js";
import { multerUpload } from "../utils/multer.js";

export const userRoute = express.Router();
userRoute.post("/submit", multerUpload.array("images"), async (req, res) => {
  const { name, socialMedia } = req.body;
  const filepaths = req.files.map((file) => {
    return file.path;
  });
  if (!name || !socialMedia || !req.files || !filepaths) {
    return res.status(400).send({ message: "All fields are required." });
  }
  const images = await upload(filepaths);
  const user = new User({
    name,
    socialMedia,
    images,
  });
  try {
    await user.save();
    res.send({
      message: "Form submitted successfully!",
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "Failed to save to database." });
  }
});
