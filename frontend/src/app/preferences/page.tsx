import { Box } from "@mui/system";
import { addIncomeGenre, getPreferences } from "../../server/preference.server";
import { Button, Typography } from "@mui/material";

export default async function PreferencePage() {
  const preferences = await getPreferences();
  console.log(preferences)


  return (
    <Box>¥
      <Typography sx={{ p: 8 }}>基本情報</Typography>
      <Box sx={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography>Name</Typography>
        <Button>Gel</Button>
      </Box>
            <Box sx={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography>el</Typography>
        <Button>Gel</Button>
      </Box>
    </Box >
  )
}

