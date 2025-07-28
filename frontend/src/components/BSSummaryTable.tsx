import { Divider, Typography } from "@mui/material";
import { Box, display } from "@mui/system";

export default function BSSummaryTable() {
  return (
    <>
    <Typography>純額 : </Typography>
    <Box sx={{ display: "flex" }}>
      <Box>
        <Typography>収入</Typography>
        <Typography>fuck</Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      <Box>
        <Typography>支出</Typography>
        <Typography>fuck</Typography>
      </Box>
    </Box>
    </>
  );
}
