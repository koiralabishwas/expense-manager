"use client"
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { deleteExpenseGenre } from '@/server/preference.server'
import { useQueryClient } from '@tanstack/react-query'
import ConfirmModal from '@/components/ConfirmModal'

interface Props {
  expenseGenres: string[]
}

const ExpenseGenreList = ({ expenseGenres }: Props) => {
  const queryClient = useQueryClient()
  return (
    <Box px={2}>
      {expenseGenres.map((e, n) =>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Pushes text to left, button to right
            alignItems: "center",
          }}
          key={n}>
          <Box>
            <Typography>{e}</Typography>
          </Box>
          <Box>
            <ConfirmModal label='削除' confirmMessage='本当に削除しますか？' >
              {(close) => ( // 'close' is passed from the Modal
                <Button
                  color='error'
                  variant='text'
                  onClick={async () => {
                    await deleteExpenseGenre(e.toString());
                    queryClient.invalidateQueries({ queryKey: ["user"] });
                    close(); // <--- Call close here!
                  }}
                >
                  削除
                </Button>
              )}
            </ConfirmModal>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ExpenseGenreList
