import mongoose, { Mongoose, Types } from "mongoose";

// TODO : Make this type usable in other places
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    yearMonth: {
      type: String,
      required: true,
      match: /^\d{6}$/, // ensures YYYYMM format
    },
    // TODO: delete yearMonth later on ,

    date: {
      type: Date,
      default: Date.now,
    },
    description: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "JPY" },
    genre: {
      type: String,
      default: "Other",
    },
  },
  { timestamps: true }
);
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
