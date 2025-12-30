"use client"
import FormModal from '@/components/FormModal'
import { addExpenseGenre } from '@/server/preference.server'
import { Box, Button, TextField } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

const ExpenseGenreForm = () => {
  const queryClient = useQueryClient()
  const submitfn = async (formData: FormData) => {
    addExpenseGenre(formData.get("expenseGenre")!.toString())
    queryClient.invalidateQueries({ queryKey: ["user"] })
  }
  return (
    <FormModal label='追加'>
      <Box
        component="form"
        action={submitfn}
      >

        <TextField
          fullWidth
          name='expenseGenre'
          id='expenseGenre'
          label="ジャンル名"
          placeholder='買い物とか'
          required
          variant='outlined'
          sx={{
            marginBottom : "10px"
          }}
        />

        <Button
          type='submit'
          variant='contained'
          fullWidth
        >保存</Button>
      </Box>
    </FormModal>
  )
}

export default ExpenseGenreForm
