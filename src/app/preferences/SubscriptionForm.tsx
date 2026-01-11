'use client'
import FormModal from '@/components/FormModal'
import { addSubscription, editSubscription } from '@/server/preference.server'
import { Subscription } from '@/types/user'
import { Button, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

interface Props {
  subscription?: Subscription
}

const SubscriptionForm = (props: Props) => {
  const queryClient = useQueryClient()


  const submitfn = async (formData: FormData) => {
    const subscriptionFormData: Subscription = {
      name: formData.get('name')!.toString(),
      amount: Number(formData.get('amount')!.toString()),
      paymentDay: Number(formData.get('paymentDay')!.toString()),
      isActive: (formData.get("isActive")!.toString()) == "true",
    }
    if(props.subscription?._id) {
      editSubscription(props.subscription._id, subscriptionFormData)
    } else {
      addSubscription(subscriptionFormData);
    }
    queryClient.invalidateQueries({ queryKey: ["user"] })
  }

  return (
    <FormModal label={props.subscription?._id ?'編集' : "追加"} >
      <Box
        component={"form"}
        action={submitfn}
      >
        <TextField
          fullWidth
          defaultValue={props.subscription?.name}
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
          defaultValue={props.subscription?.amount}
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
          defaultValue={props.subscription?.paymentDay}
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
          label="契約状況" // TODO: do a toggle instead
          defaultValue={props.subscription?.isActive === true ? "true" : "false"} // フォームのつ業上 text の "true" or "false"
          sx={{
            marginBottom: "10px"
          }}
        >
          <MenuItem value={"false"}>停止中</MenuItem>
          <MenuItem value={"true"}>利用中</MenuItem>
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
