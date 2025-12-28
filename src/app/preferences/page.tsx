import { Box, flex } from "@mui/system";
import { addIncomeGenre, getPreferences, getUser } from "../../server/preference.server";
import { Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function PreferencePage() {
  const preferences = await getPreferences();
  const session = await getServerSession(authOptions)
  const user = await getUser()


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
            <Typography>{session?.user.name}</Typography>
            <Typography>{session?.user.name}</Typography>
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
          <Typography mt={2}>出費ジャンル</Typography>
          <Box px={2}>
            {preferences.expenseGenres && preferences.expenseGenres.map((e) =>
              <Typography>{e}</Typography>
            )}
          </Box>
          <Typography mt={2}>収入ジャンル</Typography>
          <Box px={2}>
            {preferences.incomeGenres && preferences.incomeGenres.map((i) =>
              <Typography>{i}</Typography>
            )}
          </Box>

          <Typography mt={2}>サブスクリプション</Typography>
          <Box>
            {preferences.subscriptions && preferences.subscriptions.map((s) =>
              <Box px={2} pb={2}>
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
              <Typography>{preferences.creditPaymentTiming.day}日</Typography>
              <Typography>{preferences.creditPaymentTiming.delayMonth}ヶ月</Typography>
            </Box>
          </Box>
        </Box>
      </Box>



    </Box >
  )
}

