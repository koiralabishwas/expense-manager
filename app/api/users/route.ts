import clientPromise from "@/lib/monogodb";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// make this request post and use a schema
// TODO: make a better validation
const schema = z.object({
  name : z.string().min(1),
  email : z.string().min(6),
  password : z.string().min(6),
})


// need await in a lot of places
export async function POST(request : NextRequest) {
  const body = await request.json()
  const validation = schema.safeParse(body)

  if (!validation.success) 
    return NextResponse.json(validation.error.errors , {status:400});
  // quit if the validation is not succeed
  
  const data = {
    name: body.name,
    email: body.email,
    hashedPassword: body.password,
    createdAt: new Date(),
  };
  
  const client = await clientPromise

  // only register if the user with same email is not existing
  const existingUser = await client.db('expense-app-db').collection('users').findOne({
    email : body.email
  })

  if (existingUser) 
    return NextResponse.json({ error: "user exists with the username" }, { status: 404 })

  // 
  const registerUser = client.db('expense-app-db').collection('users').insertOne(data)


  return NextResponse.json(data)
}

export async function GET(request:NextRequest) {
  const client = await clientPromise
  const data = await client.db('expense-app-db').collection('users').find({
    name : 'bishwas'
  }).toArray()
  // use toArray to find many in mongodb

  return NextResponse.json(data)

}