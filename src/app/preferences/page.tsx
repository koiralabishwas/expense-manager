"use client"
import { Box, flex, gap } from "@mui/system";
import { addExpenseGenre, addIncomeGenre, getPreferences, getUserData } from "../../server/preference.server";
import { Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ExpenseGenreList from "./ExpenseGenreList";
import ExpenseGenreForm from "./ExpenseGenreForm";
import { useQuery } from "@tanstack/react-query";
import User, { userSchema } from "@/models/user";
import { UserT } from "@/types/user";
import { useSession } from "next-auth/react";

export default function PreferencePage() {
  const { data: user } = useQuery<UserT>({
    queryKey: ["user"],
    queryFn: () => getUserData()
  })

  if (user !== undefined)
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
            <Box sx={{display : "flex"  , alignItems :"center" , gap : "20px"} }>
            <Typography mt={2}>出費ジャンル</Typography>
            <ExpenseGenreForm />
            </Box>
            <ExpenseGenreList expenseGenres={user.preferences.expenseGenres} />

            <Typography mt={2}>収入ジャンル</Typography>
            <Box px={2}>
              {user.preferences.incomeGenres && user.preferences.incomeGenres.map((i, n) =>
                <Typography key={n}>{i}</Typography>
              )}
            </Box>

            <Typography mt={2}>サブスクリプション</Typography>
            <Box>
              {user.preferences.subscriptions && user.preferences.subscriptions.map((s, n) =>
                <Box px={2} pb={2} key={n}>
                  <Typography>{s.name}</Typography>
                  <Typography>{s.amount}円</Typography>
                  <Typography>{s.paymentDay}日支払い</Typography>
                  <Typography>{s.isActive ? "契約中" : "停止中"}</Typography>
                </Box>
              )}
            </Box>

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

