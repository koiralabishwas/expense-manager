import mongoose from 'mongoose';

export const db = mongoose.connect(process.env.MONGODB_URI as string)
  // .then(() => console.log("Connected to MongoDB"))t
  // .catch((e) => console.error("MongoDB connection error:", e));
