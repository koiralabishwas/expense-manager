import { Context } from "hono";
import Expense from "../models/expense";
import User from "../models/user";
import { sign , verify } from "hono/jwt";
import {genSalt , hash ,compare} from 'bcryptjs';
import {setCookie , getCookie} from "hono/cookie"

export async function login(ctx:Context) {
  const {email , password} = await ctx.req.json()
  // get user from emai and check password
  const user = await User.findOne({ email });
  const isPassMatch = await compare(password ,user!.password)
  if (!isPassMatch) return ctx.json({error : "Invalid "},401)

  const payload = {
    _id : user?._id.toHexString(),
    name : user?.name,
    email : user?.email,
    exp : Math.floor(Date.now() / 1000) * 7 * 24 * 60 * 60 // expires in 7 days
  }

  const token = await sign(payload , process.env.JWT_SECRET!)

  //TODO: look up this setCookie later
  setCookie(ctx,"x-auth-token" , token , {
    httpOnly : true,
    secure : process.env.NODE_ENV === "production",
    sameSite : 'strict',
    path : '/',
    maxAge : 60 * 60 * 60
  })
  return ctx.json({message : "LogIn Successful" , payload , token})
}

export async function register(ctx : Context) {
  const {name , email , password} = await ctx.req.json()
  // password hasing 
  const existingUser = await User.findOne({email : email})
  if (existingUser) return ctx.json({error :"user already exists with the given mail address"},400)
  const hashedPassword = hash(password , await genSalt(10))
  const user = new User({
    name: name,
    email: email,
    password: await hashedPassword
  })
  await user.save()
  return ctx.json({message : "register success" , user : {name , email}})
}

