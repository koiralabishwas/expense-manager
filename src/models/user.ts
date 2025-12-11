import mongoose, { model } from "mongoose";

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
      // TODO : use gmai mailing system to send confirmation mail to this email address
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
        ]
      },
      creditPaymentTiming : {
        /**
         * TODO:
         * cash loss に影響、何ヶ月後のものに適用するか
         */
        delayMonth : {
          type: Number,
          default:1,
          min:1,
          max:12
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
            required: true,
            type: String,
          },
          // Recommendation: You likely need the cost of the subscription
          amount: {
            required: true, 
            type: Number,
          },
          paymentDay: {
            required: true,
            type: Number,
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



const User = mongoose.models.User || model("User", userSchema );

export default User;
