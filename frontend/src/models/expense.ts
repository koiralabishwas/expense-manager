import mongoose, { model } from "mongoose";

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
      required : true,
    },
    description: { type: String },
    amount: { type: Number, required: true ,},
    currency: { type: String, default: "JPY" },
    genre: {
      type: String,
      default: "Other",
    },
    //TODO: 引き落としが翌月か翌々月か対応できるように
    isPostPaid : { 
      type : Boolean ,
      default : false
    }
  },
  { timestamps: true }
);
const Expense = mongoose.models.Expense || model('Expense', expenseSchema);

export default Expense;
