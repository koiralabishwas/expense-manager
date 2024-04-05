import clientPromise from "@/lib/monogodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";

const schema = z.object({
  // to find the user iD in which the data will be stored
  // userId : z.string(), // not needed here , passed through params
  // year month is used to find the object in which the data will be post
  yearMonth : z.string(),
  type : z.string(),
  category : z.string(),
  description : z.string(),
  method : z.string(),
  amount : z.number()
})

export const dynamic = 'force-dynamic'

// register a transaction array inside a user collection data
export async function POST(request : NextRequest , { params }: { params: { userId: string }}) {
  const body = await request.json()
  const validation = schema.safeParse(body)
  
  if (!validation.success) 
  return NextResponse.json(validation.error.errors , {status:400});
// quit if the validation is not succeed


  const data = {
    id : new ObjectId(),
    type : body.type,
    category : body.category,
    description : body.description,
    method : body.method,
    amount : body.amount,
    at : new Date()
  };
  
  const client = await clientPromise


  try{
    //check userId to all the existing userID
    const user = await client.db('bop-db').collection('users').findOne({_id: new ObjectId(params.userId)})

    // TODO: catch error. not catching errors well
    if (!user)
      return NextResponse.json({error : "user does't exist . check if the user is registered with same Id"} , {status : 400})

      
    // filter the correct uer from the collection
    const filter = {_id : new  ObjectId(params.userId)}
    //: need to type here
    const updateDoc : object  = {
      $push : {[`transactions.${body.yearMonth}`] : data}
    }


    const updateResult = await client.db('bop-db').collection('users').updateOne(filter,updateDoc )

    return NextResponse.json({success : true , data} ,{status : 201})
    
  } catch (error) {

    return NextResponse.json({error : 'request error '} , {status : 500})

  }
}

// it fix the not refetching available books in borrowbooks

// get data of a specific user
export async function GET(request: NextRequest, { params }: { params: { userId: string } }
) {
  const client = await clientPromise;

  // convert id to a obj id
  const data  = await client
    .db("bop-db")
    .collection("users")
    .find({ _id : new ObjectId(params.userId) })
    .toArray()
  return NextResponse.json(data, { status: 200 });
}
