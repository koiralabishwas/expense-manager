'use client'
import React, { useActionState } from 'react'
import { postExpense } from './action'

const initialState = {
  message : ""
}

const page = () => {
  const [state ,formAction , pending] = useActionState(postExpense , initialState)
  return (
    <form action={formAction}>
    <label htmlFor="description">description</label>
    <input type="text" id="description" name="description" required />
    <label htmlFor="Amount">Amount</label>
    <textarea id="amount" name="amount" required />
    <label htmlFor="Currency">Currency</label>
    <textarea id="currecy" name="currency" required />
    <label htmlFor="Genre">Genre</label>
    <textarea id="genre" name="genre" required />
    {state?.message && <p aria-live="polite">{state.message}</p>}
    <button disabled={pending}>Create Post</button>
  </form>
  )
}

export default page