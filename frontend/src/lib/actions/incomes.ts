"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getIncomes(yearMonth: string): Promise<any> {
  const session = await getServerSession(authOptions);
  const url = new URL(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/incomes");
  if (yearMonth) {
    url.searchParams.append("yearMonth", yearMonth);
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: "no-store",
  });

  const incomes = await res.json();
  console.log("here are incomes",incomes)
  return incomes;
}
