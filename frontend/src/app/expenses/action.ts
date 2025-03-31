'use server'

import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";

export async function postExpense(prevState : any , formData : FormData) {

  const session = await getServerSession(authOptions);

  const formBody = {
    description : formData.get('description'),
    amount : formData.get('amount'),
    currency : formData.get('currency'),
    genre : formData.get('genre')
  }

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/expenses",{
    method : "POST",
    body : JSON.stringify(formBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    }
  })

  const result = await res.json()

  if(!res.ok){
    return {message : "request failed"}
  }
  return {mesage : "submit success"}
}