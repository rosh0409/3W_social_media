import express from "express";
import cors from "cors";
import { connect } from "./db/connection.js";
import { userRoute } from "./routes/userRoutes.js";
import { adminRoute } from "./routes/adminRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(8000, (err) => {
  if (err) return console.error(err);
  connect();
  return console.log("server started...");
});
