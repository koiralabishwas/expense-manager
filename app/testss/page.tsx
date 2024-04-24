'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { json } from 'stream/consumers'
import { z } from 'zod'
import { transactionSchema } from '../data/transactionSchemas'

const schema = z.object({
  type : z.string(),
  category : z.string(),
  description : z.string(),
  amount : z.number(),
  method : z.number(),
  at : z.date()
})

type FormData = z.infer<typeof schema>



const TransactionForm = () => {
  // zod resolver is also cumpolsary
  const {register , handleSubmit , formState : {errors} } = useForm<FormData>({resolver : zodResolver(schema)})

  const onSubmit = async (formData : FormData) => {
    // make the userID dynamic later
    const response = await fetch("/api/v2/balance/660feb11f3723956e57ee2dc" , {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(formData)
    })
    const data = await response.json();
    if (response.ok) {
      console.log("Registration successful", data);
      alert("Registration successful");
    } else {
      console.log("registration failed", data);
      alert("registration failed");
    }
  }
  return (
    <div>
      <div>TransactionForm</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="type">Type</label>
        <select name="type" id="type">
          {transactionSchema.type.map(type => (<option key={type} value={type}>{type}</option>) )}
        </select><br />
        <label htmlFor="category">Category</label>
        <select name="category" id="category" defaultValue="">
          {transactionSchema.category.map(category => <option key={category} value={category}>{category}</option> )}
        </select><br />
        <label htmlFor="description">Description</label>
        <input type="text" name="input" id="input" /><br />
        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" id="amount" /><br />
        <label htmlFor="method">Method</label>
        <select name="method" id="method">
          {transactionSchema.method.map(method => <option key={method} value={method}>{method}</option> )}
        </select>
        <label htmlFor="at">At</label>
        <input type="date" name="at" id="at" />
      </form>
    </div>
  )
}

export default TransactionForm