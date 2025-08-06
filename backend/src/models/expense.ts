import mongoose from "mongoose";

// TODO : Make this type usable in other places
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //TODO:make it required
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
    //TODO: 引き落としが翌月か翌々月かで対応しなければならない
    isPostpaid : { 
      type : Boolean ,
      default : false
    }
  },
  { timestamps: true }
);
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
