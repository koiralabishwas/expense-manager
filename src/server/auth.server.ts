"use server";

import { RegisterForm } from "@/app/(auth)/register/page";
import connectDB from "@/configs/db";
import { createOTP } from "@/lib/utils";
import TempUser from "@/models/tempUser";
import User from "@/models/user";
import { genSalt, hash, compare } from "bcryptjs";
import { randomInt } from "crypto";


export async function registerUser(registerForm: RegisterForm) {
  await connectDB();
    const { name, email, password } = registerForm;

  const existingUser = await User.findOne({ email: registerForm.email });
  if (existingUser) {
    throw new Error("user already exists with the given email address");
  }
  const hashedPassword = hash(password, await genSalt(10));
  const user = new User({
    name : name,
    email : email,
    password : await hashedPassword
  })
  await user.save()
  return JSON.parse(JSON.stringify(user))
}

export async function registerTempUser(registerForm : RegisterForm) {
  await connectDB();
  const {name , email , password} = registerForm;
  const existingUser = await User.findOne({ email: registerForm.email });
  if (existingUser) {
    throw new Error("user already exists with the given email address");
  }
  const hashedPassword = hash(password, await genSalt(10));
  const tempUser = new TempUser({
    name : name,
    email : email,
    password : await hashedPassword
  })



  const OTP = createOTP()
  const hashedOTP = hash(OTP,await genSalt(10))

  
}

