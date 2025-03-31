'use client'
import React from 'react'
import PostIncome from './PostIncome'
import { useSession } from 'next-auth/react'
/**
 * TODO:
 * fetch Incomes ,
 * show total 
 * expand to show details 
 *    sort
 * 
 *
 * make a POST Income FORM
 * validate
 * post income
 * return success or error . 
 * refresh the get data
 */

export const getIncomes = async (session : any) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/api/incomes' , {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.data.accessToken}`,
    },
  })
  const income = await res.json()
  return income
} 
const page = () => {
  const session = useSession()
  if (session.data?.accessToken) {
    const data = getIncomes(session)
    console.log(data)
  }
  return (
    <div>fetch incomes</div>
  )
}

export default page