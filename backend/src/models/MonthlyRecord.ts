import mongoose, { Mongoose, Types } from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "JPY" },
    genre: {
      type: String,
      default: "Other",
    },
  },
  { timestamps: true }
);

const incomeSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "JPY" },
    genre: {
      type: String,
      default: "Other",
    },
  },
  { timestamps: true }
);

const monthlyRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  yymm: {
    type: String,
    required: true,
    match: /^\d{6}$/, // Enforce 'YYYYMM' format
  },
  expenses: [expenseSchema],
  incomes: [incomeSchema],
}).index({ userId: 1, yymm: 1 }, { unique: true });
const MonthlyRecord = mongoose.model("MonthlyRecord", monthlyRecordSchema);

export default MonthlyRecord;
