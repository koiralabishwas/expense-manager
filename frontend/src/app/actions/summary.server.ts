'use server'
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getMonthSummary(yearMonth : string) {
  const session = await getServerSession(authOptions);
  const url = new URL(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/summary/balance")
  url.searchParams.set('yearMonth' , yearMonth)
  const res = await fetch(url.toString() , {
    headers : {
      Authorization : `Bearer ${session?.accessToken}`,
    },
    cache : "no-store"
  })

  const balanceSummary : BalanceSummary = await res.json()
  return balanceSummary
}
