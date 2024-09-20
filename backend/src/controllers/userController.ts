import { Context } from "hono";
import User from "../models/user";

// List all users
export async function getUsers(ctx: Context) {
  try {
    const users = await User.find().exec(); // Return the list of users as JSON
    return ctx.json(users);
  } catch (error) {
    return ctx.json({ error: "Failed to fetch users" }, 500);
  }
}

// Get user from userId
export async function getUserById(ctx: Context) {
  try {
    const userId = ctx.req.param("userId");
    const user = await User.findById(userId);
    return ctx.json(user);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

// Create new User
export async function createUser(ctx: Context) {
  try {
    const body = await ctx.req.json();
    const newUser = await new User(body).save();
    return ctx.json(newUser);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

// update User Information
export async function updateUser(ctx: Context) {
  try {
    const userId = ctx.req.param("userId");
    const body = await ctx.req.json();
    const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true })
    return ctx.json(updatedUser)
  } catch (error) {
    return ctx.json({error} , 400)
  }
}

// delete user from userId
export async function deleteUser(ctx : Context) {
  try{
    const userId = ctx.req.param('userId');
    const deletedUser = await User.findByIdAndDelete(userId);
    return ctx.json({deletedUser})
  } catch (error) {
    return ctx.json({error} , 400)
  }
}
