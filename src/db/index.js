// src/db/index.js
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoURL = `${process.env.MONGO_URI}/${DB_NAME}`;
    console.log("=> Trying:", mongoURL);

    await mongoose.connect(mongoURL); // cleaned up

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
