import { Context } from "hono";
import User from "../models/user";


export async function getUserSettings(ctx:Context) {
  try {
    const { _id } = ctx.get("user");
    const user = await User.findById(_id)
    return ctx.json(user?.settings)
  } catch (error) {
    
  }
}
