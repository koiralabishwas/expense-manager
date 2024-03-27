import clientPromise from "@/lib/monogodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  // id will be deafult inccremented
  userId : z.string(),
  type : z.string(),
  category : z.string(),
  description : z.string(),
  method : z.string(),
  amount : z.number()
})

export async function POST(request : NextRequest) {
  const body = await request.json()
  const validation = schema.safeParse(body)

  if (!validation.success) 
    return NextResponse.json(validation.error.errors , {status:400});
  // quit if the validation is not succeed
  
  const data = {
    userId : body.userId,
    type : body.type,
    category : body.category,
    description : body.description,
    method : body.method,
    amount : body.amount
  };
  
  const client = await clientPromise



  // 
  const registerTransaction = client.db('expense-app-db').collection('transactions').insertOne(data)


  return NextResponse.json(data)
}