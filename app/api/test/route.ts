import clientPromise from "@/lib/monogodb";
import { NextRequest, NextResponse } from "next/server";


// need await in a lot of places
export async function GET( response : NextResponse) {
  const client = await clientPromise
  // const sample_airbnb = await client.db("sample_mflix").collection("comments").find().limit(100).toArray()
  const sample_airbnb = await client.db("sample_mflix").listCollections().toArray()


  return NextResponse.json(sample_airbnb)
}