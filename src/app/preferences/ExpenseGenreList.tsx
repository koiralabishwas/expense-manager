"use client"
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ExpenseGenreForm from './ExpenseGenreForm'
import { deleteExpenseGenre } from '@/server/preference.server'

interface Props {
  expenseGenres: [String]
}

const ExpenseGenreList = ({ expenseGenres }: Props) => {
  return (
    <Box px={2}>
      {expenseGenres.map((e, n) =>
        <Box key={n}>
          <Typography>{e}</Typography>
          <Button onClick={() => deleteExpenseGenre(e.toString())}>delete</Button>
        </Box>
      )}
    </Box>
  )
}

export default ExpenseGenreList
