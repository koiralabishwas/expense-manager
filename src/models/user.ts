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

    preferences: {
      expenseGenres: {
        type: [String],
        default: [
          "水分補給",
          "ドリンク",
          "食事",
          "お菓子",
          "日常品",
          "勉強",
          "娯楽",
          "趣味",
          "Other",
        ],
      },
      incomeGenres: {
        type: [String],
        default: ["給料" , "賞与", "謝礼金", "お小遣い", "その他収入"],
      },
      creditPaymentTiming: {
        delayMonth: {
          type: Number,
          default: 1,
          min: 1,
          max: 12,
        },
        day: {
          type: Number,
          min: 1,
          max: 31,
          default: 25,
        },
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
          isPostPaid: {
            type: Boolean,
            default: true,
          },
          isActive: {
            type: Boolean,
            default: true, // Default to true makes sense when adding a new one
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || model("User", userSchema);

export default User;
