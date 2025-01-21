import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import pLimit from "p-limit";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SEC,
});

const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url; 
  } catch (error) {
    throw new Error(`Failed to upload ${filePath}: ${error.message}`);
  }
};

export const upload = async (images) => {
  const limit = pLimit(10); 
  const uploadTasks = images.map((image) =>
    limit(() => uploadImageToCloudinary(image))
  );
  try {
    const results = await Promise.all(uploadTasks);
    console.log("All images uploaded successfully:", results);
    return results;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};
