"use client";
import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { Box, Typography, CircularProgress } from "@mui/material";

type User = { _id: string; name: string; email: string };

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch<{ payload: User }>("http://localhost:8000/api/users")
      .then((data) => setUser(data.payload))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );

  if (!user)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No user data available.</Typography>
      </Box>
    );

  return (
    <Box sx={{ color: "black", p: 3 }}>
      <Typography variant="h4">User Dashboard</Typography>
      <Typography variant="h6">Name: {user.name}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>ID: {user._id}</Typography>
    </Box>
  );
}
