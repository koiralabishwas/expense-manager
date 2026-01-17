'use client'
import FormModal from '@/components/FormModal'
import { addSubscription, editSubscription } from '@/server/preference.server'
import { Subscription } from '@/types/user'
import { Button, Switch, TextField, Typography, Box } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

interface Props {
  subscription?: Subscription
}

const SubscriptionForm = (props: Props) => {
  const queryClient = useQueryClient()

  // Calculate the initial state once. 
  // If subscription is undefined (loading/new), default to true.
  const initialIsActive = props.subscription?.isActive ?? true;
  const initialIsPostPaid = props.subscription?.isPostPaid ?? true;

  const submitfn = async (formData: FormData) => {
    const subscriptionFormData: Subscription = {
      name: formData.get('name')?.toString() || '',
      amount: Number(formData.get('amount')),
      paymentDay: Number(formData.get('paymentDay')),
      isActive: formData.has('isActive'),
      isPostPaid: formData.has('isPostPaid')
    }

    if (props.subscription?._id) {
      await editSubscription(props.subscription._id, subscriptionFormData)
    } else {
      await addSubscription(subscriptionFormData);
    }
    queryClient.invalidateQueries({ queryKey: ["user"] })
  }

  return (
    <FormModal label={props.subscription?._id ? '編集' : "追加"}>
      <Box
        component={"form"}
        action={submitfn}
        // Key on the form handles the big transitions (Edit A -> Edit B)
        key={props.subscription?._id || 'form-root'}
      >
        <TextField
          fullWidth
          defaultValue={props.subscription?.name || ''}
          name='name'
          label='サブスクリプション名'
          required
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          defaultValue={props.subscription?.amount ?? ''}
          type='number'
          name='amount'
          label='値段'
          required
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          defaultValue={props.subscription?.paymentDay ?? ''}
          type='number'
          name='paymentDay'
          label="支払日"
          required
          slotProps={{
            htmlInput: {
              min: 1,
              max: 31
            },
          }}
          sx={{ mb: 1 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography color={!initialIsActive ? "text.primary" : "text.secondary"}>
            停止中
          </Typography>

          {/* FIX: The 'key' here forces React to replace this Switch entirely 
              if the ID or the active status changes, preventing the MUI warning. */}
          <Switch
            key={`${props.subscription?._id}-${initialIsActive}`}
            name='isActive'
            defaultChecked={initialIsActive}
          />

          <Typography color={initialIsActive ? "text.primary" : "text.secondary"}>
            利用中
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Switch
            key={`${props.subscription?._id}-${initialIsPostPaid}`}
            name='isPostPaid'
            defaultChecked={initialIsPostPaid}
          />

          <Typography color={initialIsPostPaid ? "text.primary" : "text.error"}>
            後払い
          </Typography>
        </Box>

        <Button type='submit' variant='contained' fullWidth>
          保存
        </Button>
      </Box>
    </FormModal>
  )
}

export default SubscriptionForm
