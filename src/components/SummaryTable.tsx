'use client'
import { getMonthSummary } from "@/server/summary.server";
import { getCurrentYearMonth } from "@/lib/utils";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function SummaryTable() {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();
  const { data: balance } = useQuery<BalanceSummary>({
    queryKey: ["balanceSummary", yearMonth],
    queryFn: () => getMonthSummary(yearMonth),
  });

  return (
    <>
      {balance && (
        <Box>
          <>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography>収入</Typography>
                <Typography>{balance.totalIncome.toLocaleString()}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Box>
                <Typography>即時払い</Typography>
                <Typography>{balance.currentMonthPaid.toLocaleString()}</Typography>

                <Typography>後払い</Typography>
                <Typography>{balance.currentMonthPostPaid.toLocaleString()}</Typography>
                <Divider sx={{ my: 2, fontWeight: "bold" }} variant="fullWidth" />
                <Typography>合計</Typography>
                <Typography>{balance.totalExpense.toLocaleString()}</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              純額 : {balance.netAmount.toLocaleString()}
            </Typography>
          </>
          <Divider sx={{ my: 2, fontWeight: "bold" }} variant="fullWidth" />

          <>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography>収入</Typography>
                <Typography>{balance.totalIncome.toLocaleString()}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Box>
                <Typography>現金出費</Typography>
                <Typography>{balance.currentMonthPaid.toLocaleString()}</Typography>
                <Typography>先月後払い引落</Typography>
                <Typography>{balance.prevMonthPostPaid.toLocaleString()}</Typography>
                <Divider sx={{ my: 2, fontWeight: "bold" }} variant="fullWidth" />

                <Typography>合計</Typography>
                <Typography>{balance.totalCashLoss.toLocaleString()}</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              現金残高 : {(balance.totalIncome - balance.totalCashLoss).toLocaleString()}
            </Typography>
          </>
        </Box>
      )
      }
    </>
  );
}
