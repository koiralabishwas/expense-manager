import clientPromise from "@/lib/monogodb";
import { ObjectId } from "mongodb";
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

  try{
    //check userId to all the existing userID
    const userExistance = await client.db('expense-app-db').collection('users').findOne({_id: new ObjectId(data.userId)})

    // TODO: catch error. not catching errors well
    if (!userExistance)
      return NextResponse.json({error : "user does't exist . check if the user is registered with same Id"} , {status : 400})

    const registerTransaction = client.db('expense-app-db').collection('transactions').insertOne(data)

    return NextResponse.json({success : true , transactionId : (await registerTransaction).insertedId , data} ,{status : 201})
    
  } catch (error) {

    return NextResponse.json({error : 'request error '} , {status : 500})

  }
}

export async function GET(request:NextRequest) {
  const client = await clientPromise
  const data = await client.db('expense-app-db').collection('transactions').find().toArray()

  return NextResponse.json(data  , {status : 200})
}