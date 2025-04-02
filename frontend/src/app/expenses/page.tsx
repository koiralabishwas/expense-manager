'use client'
import React, { useActionState } from 'react'
import { postExpense } from './action'
import { Box, Button, TextField } from '@mui/material'

const initialState = {
  message : ""
}

const page = () => {
  const [state ,formAction , pending] = useActionState(postExpense , initialState)
  return (
    <form action={formAction}>
      <Box maxWidth={400} mx="auto" mt={6} px={2}>
        <TextField label="description" id='description' name='description' required/>
        <TextField label="amount" id='amount' name='amount' required/>
        <TextField label="currency" id='currency' name='currency' required/>
        <TextField label="genre" id='genre' name='genre' required/>
        {state?.message && <p aria-live="polite">{state.message}</p>}
        <Button type='submit' variant='contained' fullWidth sx={{mt:2}} >{pending ? "submitting.." : "submit"}</Button>
      </Box>
  </form>
  )
}

export default page