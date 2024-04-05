import clientPromise from "@/lib/monogodb";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongodb";
// make this request post and use a schema
// TODO: make a better validation
const schema = z.object({
  name : z.string().min(1),
  email : z.string().min(6),
  password : z.string().min(6),
})


// register a user
// need await in a lot of places to work properly
export async function POST(request : NextRequest) {
  const body = await request.json()
  const validation = schema.safeParse(body)

  if (!validation.success) 
    return NextResponse.json(validation.error.errors , {status:400});
  // quit if the validation is not succeed

  // hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(body.password , 10)
  
  const data = {
    name: body.name,
    email: body.email,
    password: await hashedPassword,
    createdAt: new Date(),
  };
  
  const client = await clientPromise

  // check if the use is existing with same email
  const existingEmail = await client.db('bop-db').collection('users').findOne({
    email : body.email
  })

  if (existingEmail) 
    return NextResponse.json({ error: "user exists with the email" }, { status: 400})

  // 
  const registerUser = client.db('bop-db').collection('users').insertOne(data)


  return NextResponse.json(data)
}



// fetch all registered users
export async function GET(request:NextRequest) {
  // FIXME: siply return all registered users FIXME: not the transaction array
  const client = await clientPromise
  const projection = {password : 0 , transactions : 0}
  const data = await client.db('bop-db').collection('users').find({} , {projection}).toArray()

  

  return NextResponse.json(data)

}