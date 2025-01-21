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

app.get("/", (req, res) => {
  res.send(`
      <div style="font-family: Arial, sans-serif; margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
  <ul style="list-style-type: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #ddd;">
      <p style="margin: 0; font-size: 16px; color: #333;">
        <span style="font-weight: bold; color: #007BFF;">GET:</span> 
        <span style="color: #555;">/admin/dash</span>
        <div style="margin-top: 5px; color: #666; font-size: 14px;">
          Get request for getting all user data
        </div>
      </p>
    </li>
    <li style="margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #ddd;">
      <p style="margin: 0; font-size: 16px; color: #333;">
        <span style="font-weight: bold; color: #28A745;">POST:</span> 
        <span style="color: #555;">/user/submit</span>
        <div style="margin-top: 5px; color: #666; font-size: 14px;">
          Post request for submitting user form data
        </div>
      </p>
    </li>
  </ul>     
</div>
    `);
});

app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(8000, (err) => {
  if (err) return console.error(err);
  connect();
  return console.log("server started...");
});
