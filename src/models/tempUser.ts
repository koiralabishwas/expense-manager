import mongoose, { InferSchemaType, Model, model } from "mongoose";
import { UserType } from "./user";

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
    otp : {
    type : String , 
    required : true
  },
  createdAt : {
    type : Date , 
    default : Date.now,
    index : {expireAfterSeconds : 60}
  }
});

// FIXME: this adds types but dont add inexes like expireAfterSeconds and uniquie field in db
// export type TempUserType = InferSchemaType<typeof tempUserSchema>

// const TempUser = mongoose.models.TempUser as Model<TempUserType> || model<UserType>("TempUser" , tempUserSchema)


const TempUser = mongoose.models.TempUser || mongoose.model('TempUser' , tempUserSchema)


export default TempUser
