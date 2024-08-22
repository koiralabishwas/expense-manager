import { Hono } from "hono";
import { StrictMode } from "hono/jsx";
import mongoose from "mongoose";

const Users = mongoose.model("users", new mongoose.Schema({} , {strict : false}))

export async function listUsers() {
  const users = await Users.find()
  return users
}

export const home = new Hono()
  
  home.get("/" , async (res) => {

    const result : any = await listUsers()
    console.log(result)
    return res.json(await result)
  })

  



