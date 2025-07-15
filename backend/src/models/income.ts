import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // TODO: delete yearMonth later on ,
    yearMonth: {
      type: String,
      required: true,
      match: /^\d{6}$/, // ensures YYYYMM format
    },
    date : {
      type : Date,
      default : Date.now
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
const Income = mongoose.model("Income", incomeSchema);

export default Income;
