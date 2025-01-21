import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("db connected...");
    })
    .catch((err) => {
      console.error(err);
    });
};
