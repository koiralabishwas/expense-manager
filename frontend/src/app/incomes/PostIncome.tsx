import React from 'react'
import { number, string, z } from 'zod'

export const IcomeGenre = z.enum([
  "Salary" , "Gratuity" , "Allowence" , "Bonus" , "Other"
]);


const schema  = z.object({
  // description , amount , genre , currency
  descripton : string().min(1).max(50),
  genre: IcomeGenre,
  amount : number(),
  currecny : string().regex(/^[A-Z]{3}/ , "must be 3 digit currency Code").default('JPY')
})

type IncomeForm = z.infer<typeof schema>

const postIncome = () => {
  return (
    <div></div>
  )
}

export default postIncome