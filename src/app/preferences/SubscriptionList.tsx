"use client"
import { deleteSubscription } from '@/server/preference.server'
import { Subscription } from '@/types/user'
import { Button, Typography } from '@mui/material'
import { Box, flex } from '@mui/system'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import SubscriptionForm from './SubscriptionForm'

interface Props {
  subscriptions: Subscription[]
}

const SubscriptionList = ({ subscriptions }: Props) => {
  const queryClient = useQueryClient()
  return (
    <Box>
      {subscriptions.map((s, n) =>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >

          <Box px={2} pb={2} key={n}>
            {/* <Typography>{s.name}</Typography> */}
            <Typography>{s.name}</Typography>
            <Typography>{s.amount}円</Typography>
            <Typography>{s.paymentDay}日支払い</Typography>
            <Typography>{s.isActive ? "契約中" : "停止中"}</Typography>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column"
          }}>
            <Button sx={{ color: "green", border: "0.1rem solid green", mb: "0.1rem" }}>編集</Button>
            <Button onClick={() => { deleteSubscription(s._id!); queryClient.invalidateQueries({ queryKey: ["user"] }) }} sx={{ color: "red", border: "0.1rem solid red", mb: "0.1rem" }}>削除</Button>

          </Box>
        </Box>
      )}
      
    </Box>
  )
}

export default SubscriptionList
