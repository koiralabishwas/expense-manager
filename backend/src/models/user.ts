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

    preferences : {
      expenseGenres: {
        type: [String],
        default: [
          "Water",
          "Drinks",
          "Meal",
          "Snacks",
          "Groceries",
          "Entertainment",
          "Devices",
          "Hangouts",
          "Study",
          "Clothing",
          "Other",
        ],
      },
      incomeGenres: {
        type: [String],
        default: [
          "Salary",
          "Gratuity",
          "Allowance",
          "Bonus",
          "Other",
        ],
      },
      creditPaymentTiming : {
        /**
         * TODO:
         * cash loss に影響、何ヶ月後のものに適用するか
         */
        delayMonth : {
          type: Number,
          default:1
        },
        day : {
          type : Number,
          min : 1,
          max : 31,
          default : 25
        }
      },
      subscriptions: [
        //TODO: run as a batch every start of the month and add the expenses .
        {
          name: {
            type: String,
            required: true,
          },
          // Recommendation: You likely need the cost of the subscription
          amount: {
            type: Number,
            required: true, 
            default: 0
          },
          day: {
            type: Number,
            required: true,
            min: 1,
            max: 31, // Added validation for valid days
          },
          isActive: {
            type: Boolean,
            default: true, // Default to true makes sense when adding a new one
          },
        },
      ],
    }

  },
  { timestamps: true },
);



const User = mongoose.model("User", userSchema );

export default User;
