import { Context } from "hono";
import Expense from "../models/expense";
import User from "../models/user";
import { sign , verify } from "hono/jwt";
import {setCookie , getCookie} from "hono/cookie"

// dunno what tf is this
export async function authentication(ctx: Context) {
  const token = getCookie(ctx, "token") || ctx.req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return ctx.json({ error: "Unauthorized" }, 401);
  }

  try {

    
    const payload = await verify(token, process.env.JWT_SECRET!);
    ctx.set("user", payload);  // Attach user payload for future use
    return;  // Continue to the next handler
  } catch (error) {
    return ctx.json({ error: "Unauthorized" }, 401);
  }
}

export async function login(ctx:Context) {
  const {email , password} = await ctx.req.json()
  // get user from emai and check password
  const user = await User.findOne({ email });
  const isPassMatch = (await password) == user?.password;

  const payload = {
    id : user?._id,
    name : user?.name,
    email,
    exp : Math.floor(Date.now() / 1000) * 60 * 60
  }

  const token = await sign(payload , process.env.JWT_SECRET!)
  setCookie(ctx,"token" , token)
  return ctx.json({payload , token})
}

