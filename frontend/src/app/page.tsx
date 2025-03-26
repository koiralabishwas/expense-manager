'use client'
import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <Box mx="auto" mt={6} px={2}  >
      <Button variant="contained" color="primary" size="large" type="button" sx={{borderRadius : '10px' , paddingX : 5}}>Hello World</Button>
    </Box>
  );
}
