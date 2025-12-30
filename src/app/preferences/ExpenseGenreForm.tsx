import FormModal from '@/components/FormModal'
import { addExpenseGenre } from '@/server/preference.server'
import React from 'react'

const ExpenseGenreForm = () => {
  const submitfn = async (formData: FormData) => {
    addExpenseGenre(formData.get("expenseGenre")!.toString())
  }
  return (
    <FormModal>
      <form action={submitfn}>
        <input type="text" name="expenseGenre" id="expenseGenre" />
        <button type="submit">submit</button>
      </form>
    </FormModal>
  )
}

export default ExpenseGenreForm
