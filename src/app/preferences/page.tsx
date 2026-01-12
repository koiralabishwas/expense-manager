"use client"
import { Box, flex, gap } from "@mui/system";
import { getUserData } from "../../server/preference.server";
import { Button, Typography } from "@mui/material";
import ExpenseGenreList from "./ExpenseGenreList";
import ExpenseGenreForm from "./ExpenseGenreForm";
import { useQuery } from "@tanstack/react-query";
import { UserT } from "@/types/user";
import IncomeGenreList from "./IncomeGenreList";
import IncomeGenreForm from "./incomeGenreForm";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionList from "./SubscriptionList";

export default function PreferencePage() {
  const { data: user } = useQuery<UserT>({
    queryKey: ["user"],
    queryFn: () => getUserData()
  })

  if (user?.name)
    return (

      <Box p={2}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2

        }}>
          <Typography >基本情報</Typography>
          <Box sx={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
          }}>
            <Box px={2}>
              <Typography >Name</Typography>
              <Typography>Email</Typography>
              <Typography>Password</Typography>
            </Box>
            <Box px={2}>
              <Typography>{user.name}</Typography>
              <Typography>{user.name}</Typography>
              <Typography>変更クリック</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2

        }}>
          <Typography >個人設定</Typography>
          <Box sx={{
            display: "table-column",
            // flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Typography mt={2}>出費ジャンル</Typography>
              <ExpenseGenreForm />
            </Box>
            <ExpenseGenreList expenseGenres={user.preferences.expenseGenres} />

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Typography mt={2}>収入ジャンル</Typography>
              <IncomeGenreForm />
            </Box>
            <IncomeGenreList incomeGenres={user.preferences.incomeGenres} />

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Typography mt={2}>サブスクリプション</Typography>
                <SubscriptionForm />
              </Box>
            </Box>

            <SubscriptionList subscriptions={user.preferences.subscriptions} />


            <Typography mt={2}>後払い設定</Typography>
            <Box></Box>

            <Box sx={{
              display: "flex",
              // flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
            }}>
              <Box px={2}>
                <Typography>支払日</Typography>
                <Typography>支払い遅延</Typography>
              </Box>
              <Box px={2}>
                <Typography>{user.preferences.creditPaymentTiming.day}日</Typography>
                <Typography>{user.preferences.creditPaymentTiming.delayMonth}ヶ月</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography>testing out form</Typography>

        </Box>

      </Box >
    )
}

