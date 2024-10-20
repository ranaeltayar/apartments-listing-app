import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();
const mongoURI: string | undefined = process.env.MONGO_URI;

export const connectDB = async (): Promise<void> => {
  if (!mongoURI) {
    console.error("MongoDB URI not found in environment variables.");
    throw new Error("MongoDB URI not set in environment variables");
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected…");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
