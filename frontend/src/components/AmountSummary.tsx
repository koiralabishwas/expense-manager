'use client'

import { Box, Typography, Divider } from "@mui/material";

interface Props {
  summary: ExpenseSummary | IncomeSummary
}

// Translation dictionary
const keyLabels: Record<string, string> = {
  total: "合計",
  cashPaid: "現金払い",
  postPaid: "後払い",
  genre: "ジャンル別",
  prevMonthPostPaid: "先月分引落し",
  cashLoss: "合計キャッシュロス"
};

export default function AmountSummary({ summary }: Props) {
  return (
    <Box sx={{
      px : 5
    }}>
      <Box>

        {Object.entries(summary).map(([key, value], index) => {
          const label = keyLabels[key] ?? key;

          return typeof value === 'object' && value !== null ? (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
              <Box sx={{ pl: 2, mt: 1 }}>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <Box
                    key={subKey}
                    sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
                  >
                    <Typography>{subKey}</Typography>
                    <Typography>{subValue.toLocaleString()}</Typography>
                  </Box>
                ))}
              </Box>
              {index !== Object.entries(summary).length - 1 && (
                <Divider sx={{ my: 1 }} />
              )}
            </Box>
          ) : (
            <Box
              key={key}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>{label}</Typography>
              <Typography>{Number(value).toLocaleString()}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  )
}
