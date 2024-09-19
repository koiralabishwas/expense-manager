import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  userId : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
  description : {type : String , required : true},
  amount : {type : Number , required : true},
  genre : {
    type : String , 
    enum : ['Salary' , 'Gratuity' , "Other"],
    default : 'Other'
  }
} , {timestamps : true})
const Income = mongoose.model('Income' , incomeSchema)

export default Income