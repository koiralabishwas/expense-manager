'use client'
import FormModal from '@/components/FormModal'
import { addSubscription } from '@/server/preference.server'
import { Subscription } from '@/types/user'
import { Button, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

interface Props {
  props?: Subscription
}

const SubscriptionForm = ({ props }: Props) => {
  const queryClient = useQueryClient()


  const submitfn = async (formData: FormData) => {
    const subscription: Subscription = {
      name: formData.get('name')!.toString(),
      amount: Number(formData.get('amount')!.toString()),
      paymentDay: Number(formData.get('paymentDay')!.toString()),
      isActive: (formData.get("isActive")!.toString()) == "true",
    }

    addSubscription(subscription);
    queryClient.invalidateQueries({ queryKey: ["user"] })
  }

  return (
    <FormModal label='追加' >
      <Box
        component={"form"}
        action={submitfn}
      >
        <TextField
          fullWidth
          type='text'
          name='name'
          id='name'
          label='サブスクリプション名'
          placeholder='ネトフリ'
          required
          variant='outlined'
          sx={{
            marginBottom: "10px"
          }}

        />
        <TextField
          fullWidth
          type='number'
          name='amount'
          id='amount'
          label='値段'
          required
          variant='outlined'
          sx={{
            marginBottom: "10px"
          }}
        />
        <TextField
          fullWidth
          type='number'
          name='paymentDay'
          id='paymentDay'
          label="支払日"
          placeholder='〇〇日'
          required
          sx={{
            marginBottom: "10px"
          }}
        />
        <TextField
          fullWidth
          select
          name='isActive'
          id='isActive'
          label="契約状況"
          defaultValue={"true"}
          sx={{
            marginBottom: "10px"
          }}
        >
          <MenuItem value={"false"}>停止中</MenuItem>
          <MenuItem value={"true"}>解約中</MenuItem>
        </TextField>
        <Button
          type='submit'
          variant='contained'
          fullWidth
        >保存</Button>
      </Box>
    </FormModal>
  )
}

export default SubscriptionForm
