import express from "express";
import User from "../model/User.js";

export const adminRoute = express.Router();

adminRoute.get("/dash", async (req, res) => {
  try {
    const data = await User.find();
    res.json({ message: "Data fetched", data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch submissions." });
  }
});
