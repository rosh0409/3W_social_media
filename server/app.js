import express from "express";
import cors from "cors";
import { connect } from "./db/connection.js";
import { userRoute } from "./routes/userRoutes.js";
import { adminRoute } from "./routes/adminRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

console.log(process.env.MONGODB_URI);

app.use("/static", express.static("./uploads"));
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(8000, (err) => {
  if (err) return console.error(err);
  connect();
  return console.log("server started...");
});
