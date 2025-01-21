import express from "express";
import User from "../model/User.js";
import { upload } from "../utils/multer.js";

export const userRoute = express.Router();

userRoute.post("/submit", upload.array("images"), async (req, res) => {
  const { name, socialMedia } = req.body;

  if (!name || !socialMedia || !req.files) {
    return res.status(400).send({ message: "All fields are required." });
  }

  // Save the submission to the database
  const user = new User({
    name,
    socialMedia,
    images: req.files.map((file) => file.filename),
  });
  req.files.map((file) => console.log(file));

  try {
    await user.save();
    res.send({
      message: "Form submitted successfully!",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to save to database." });
  }
});
