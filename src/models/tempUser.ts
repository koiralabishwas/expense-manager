import mongoose, { model } from "mongoose";

export const tempUserSchema = new mongoose.Schema({
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
});

// const TempUser = mongoose.models.TempUser || model("TempUser" , tempUserSchema)
const TempUser = mongoose.model('TempUser' , tempUserSchema)

export default TempUser
