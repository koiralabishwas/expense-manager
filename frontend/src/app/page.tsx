'use client'
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data : session , status } = useSession()
  return (
    <Box mx="auto" mt={6} px={2}  >
      {status === "authenticated" && <Typography>Hello {session.user.name}</Typography>}
    </Box>
  );
}
