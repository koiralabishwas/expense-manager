"use client"
import { Subscription } from '@/types/user'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface Props {
  subscriptions : Subscription[]
}

const SubscriptionList = ({subscriptions} : Props) => {
  return (
    <Box>
      {subscriptions.map((s, n) =>
        <Box px={2} pb={2} key={n}>
          {/* <Typography>{s.name}</Typography> */}
          <Typography>{s.name}</Typography>
          <Typography>{s.amount}円</Typography>
          <Typography>{s.paymentDay}日支払い</Typography>
          <Typography>{s.isActive ? "契約中" : "停止中"}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default SubscriptionList
