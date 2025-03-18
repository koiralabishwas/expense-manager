import { Context } from "hono";
import Expense from "../models/expense";
import User from "../models/user";
import { sign , verify } from "hono/jwt";
import {setCookie , getCookie} from "hono/cookie"

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
  setCookie(ctx,"token" , token , {
    httpOnly : true,
    secure : process.env.NODE_ENV === "production",
    sameSite : 'strict',
    path : '/',
    maxAge : 60 * 60
  })
  return ctx.json({message : "LogIn Successful" , payload , token})
}

export async function register(ctx : Context) {
  const {name , email , password} = await ctx.req.json()
  
  const user = new User({
    name: name,
    email: email,
    password: password
  })

  return ctx.json({message : "register success" , user : {name , email}})
}

