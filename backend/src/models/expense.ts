import mongoose, { Mongoose } from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
  description : {type : String , required : true},
  amount : {type : Number , required : true},
  genre : {
    type : String ,
    default : "Other" 
  }
} , {timestamps : true})
const Expense = mongoose.model('Expense' , expenseSchema)

export default Expense