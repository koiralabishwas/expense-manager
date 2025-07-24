"use server";
import { ExpenseForm } from "@/components/ExpenseForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getExpense(yearMonth: string): Promise<Expense[]> {
  const session = await getServerSession(authOptions);
  const url = new URL(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/expenses");
  if (yearMonth) {
    url.searchParams.append("yearMonth", yearMonth);
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: "no-store",
  });

  const expenses: Expense[] = await res.json();
  return expenses;
}

export async function postExpense(expense: ExpenseForm) : Promise<Expense> {
  const session = await getServerSession(authOptions)
  const result = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/expenses",
    {
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      method: "POST",
    }
  );
  return await result.json();
}

export async function putExpense(_id : string , expense: ExpenseForm) : Promise<Expense> {
  const session = await getServerSession(authOptions)
  const result = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/expenses/"+_id,
    {
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      method: "PUT",
    }
  );
  return await result.json();
}



export async function deleteExpense(id: string): Promise<Expense> {
  const session = await getServerSession(authOptions);
  const deleteReq = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  return await deleteReq.json();
}
