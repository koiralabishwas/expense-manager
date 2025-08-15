import { DateTime } from "luxon";
import mongoose from "mongoose";
import Income from "./income";
import Expense from "./expense";

// Define a schema for the `User` model
export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);



const User = mongoose.model("User", userSchema );

export default User;
