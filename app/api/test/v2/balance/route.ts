import clientPromise from "@/lib/monogodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// fetch all balance of all users
export async function GET(request:NextRequest) {
  const client = await clientPromise
  const data = await client.db('bop-db').collection('users').find().toArray()

  return NextResponse.json(data, {status : 200})
}