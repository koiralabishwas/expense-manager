"use client";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

interface User {
  _id: string;
  // name: string;
  // email: string;
}

export default function Dashboard() {
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<[User] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes`, {
          credentials: "include", // Important for auth cookies
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data: [User] = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">{user[0].description}!</Typography>
        {/* <Typography variant="h4">{user.name}!</Typography>
        <Typography variant="body1">{user.email}</Typography> */}
      </Box>
    );
  }

  return (
    <Box sx={{ color: "black", p: 3 }}>
      <Typography variant="h4">User data not available.</Typography>
    </Box>
  );
}
