import mongoose from "mongoose";

// Define a schema for the `User` model
export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String, required: true, unique: true
    },
    password: {
      type: String, required: true
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
