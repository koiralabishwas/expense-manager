"use server";
import { IncomeForm } from "@/components/IncomeForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getIncomes(yearMonth: string): Promise<Income[]> {
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

  const incomes: Income[] = await res.json();
  return incomes;
}

export async function postIncome(income : IncomeForm) : Promise<Income> {
  const session = await getServerSession(authOptions)
    const result = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/incomes",
      {
        body: JSON.stringify(income),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`
        },
        method: "POST",
      }
    );

    return await result.json();
}

export async function deleteIncome(id: string): Promise<Income> {
  const session = await getServerSession(authOptions);
  const deleteReq = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  return await deleteReq.json();
}
