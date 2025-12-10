"use server";

import connectDB from "@/configs/db";
import { RegisterForm } from "../(auth)/register/page";
import User from "@/models/user";
import { genSalt, hash, compare } from "bcryptjs";


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

