"use client"
import FormModal from '@/components/FormModal'
import { addIncomeGenre } from '@/server/preference.server'
import { TextField, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

const incomeGenreForm = () => {
  const queryClient = useQueryClient()
  const submitfn = async (formData: FormData) => {
    addIncomeGenre(formData.get("incomeGenre")!.toString())
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
          name='incomeGenre'
          id='incomeGenre'
          label="ジャンル名"
          placeholder='バイト給与'
          required
          variant='outlined'
          sx={{
            marginBottom: "10px"
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

export default incomeGenreForm
