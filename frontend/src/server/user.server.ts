"use server";

import connectDB from "@/configs/db";
import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import { getServerSession } from "next-auth";

// List all users
export async function getUsers() {
  connectDB();
  const users = await User.find().exec(); // Return the list of users as JSON
  return JSON.parse(JSON.stringify(users));
}

export async function deleteLoggedUser() {
  connectDB();
  const session = await getServerSession(authOptions);
  const deletedUser = await User.findByIdAndDelete(session?.user._id, {
    new: true,
  });
  return JSON.parse(JSON.stringify(deletedUser));
}

// Get user from userId
export async function getUserById(userId: string) {
  const user = await User.findById(userId);
  return JSON.parse(JSON.stringify(user));
}

// Create new User
export async function createUser(userData: Object) {
  const newUser = await new User(userData).save();
  return JSON.parse(JSON.stringify(newUser));
}

// update User Information
export async function updateUser(userId: string, userData: Object) {
  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
  });

  return JSON.parse(JSON.stringify(updateUser));
}

// delete user from userId
export async function deleteUser(userId: string) {
  const deletedUser = await User.findByIdAndDelete(userId);
  return JSON.parse(JSON.stringify(deletedUser));
}
