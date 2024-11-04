import mongoose from "mongoose";
import { DB_URI } from "@assets/constants";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
