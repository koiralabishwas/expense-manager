'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { json } from 'stream/consumers'
import { date, z } from 'zod'
import { transactionSchema } from '../data/transactionSchemas'

const schema = z.object({
  yearMonth : z.string(),
  type : z.string(),
  category : z.string(),
  description : z.string(),
  amount : z.number(),
  method : z.string(),
  at : z.string()
})

type FormData = z.infer<typeof schema>



const TransactionForm = () => {
  // zod resolver is also cumpolsary
  const {register , handleSubmit , formState : {errors} } = useForm<FormData>({resolver : zodResolver(schema)})

  const onSubmit = async (formData : FormData) => {
    // make the userID dynamic later
    console.log(formData , "formSubmitted")
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
        <label htmlFor="yearMonth">YearMonth</label><br />
        <select id="yearMonth" {...register("yearMonth")}>
          <option value="2024/04">2024/04</option>
        </select><br />
        <label htmlFor="type">Type</label>
        <select id="type" {...register("type")}>
          <option value="">select...</option>
          {transactionSchema.type.map(types => (<option key={types} value={types}>{types}</option>) )}
        </select>
        {errors.type && <p className='text-red'>{errors.type.message}</p> }
        <br />
        <label htmlFor="category">Category</label>
        <select id="category"  {...register('category')}>
          <option value="">select...</option>
          {transactionSchema.category.map(category => <option key={category} value={category}>{category}</option> )}
        </select><br />
        <label htmlFor="description">Description</label>
        <input type="text" id="input" {...register('description')} /><br />
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount"  {...register("amount",{setValueAs: value => parseInt(value)})}/><br />
        {errors.amount && <p className='text-red-500'>{errors.amount.message}</p> }
        <label htmlFor="method">Method</label>
        <select id="method" {...register('method')}>
          {transactionSchema.method.map(method => <option key={method} value={method}>{method}</option> )}
        </select>
        <label htmlFor="at">At</label>
        <input type="date" id="at" {...register('at' ,{setValueAs : value => new Date(value).toLocaleDateString()}) }/>
        {errors.at && <p className='text-red-500'>{errors.at.message}</p> }
        <br />
        <button type='submit' className='btn'>submit</button>
      </form>
    </div>
  )
}

export default TransactionForm