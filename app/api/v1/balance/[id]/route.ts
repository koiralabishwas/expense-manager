import clientPromise from "@/lib/monogodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

//  interface Data {
//   _id: ObjectId
//   amount: number;
//   category: string;
//   description: string;
//   method: string
//   type: string;
//   userId: string
// }

// it fix the not refetching available books in borrowbooks
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;

  // convert id to a obj id
  const data  = await client
    .db("expense-app-db")
    .collection("transactions")
    .find({ userId: params.id })
    .toArray()
  return NextResponse.json(data, { status: 200 });
}
