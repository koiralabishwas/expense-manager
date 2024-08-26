import { Context } from "hono";
import { listUserById, listUsers } from "../services/userServices";
import User from "../models/user";

export async function getUsers(ctx: Context) {
  try {
    const users = await User.find().exec(); // Return the list of users as JSON
    return ctx.json(users);
  } catch (error) {
    return ctx.json({ error: "Failed to fetch users" }, 500);
  }
}

export async function getUserById(ctx: Context) {
  try {
    const id = ctx.req.param("id");
    const user = await User.findById(id);
    return ctx.json(user);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

export async function createUser(ctx: Context) {
  try {
    const body = await ctx.req.json();
    const newUser = await new User(body).save();
    return ctx.json(newUser);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

export async function updateUser(ctx: Context) {
  try {
    const id = ctx.req.param("id");
    const body = await ctx.req.json();
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true })
    return ctx.json(updatedUser)
  } catch (error) {
    return ctx.json({error} , 400)
  }
}
