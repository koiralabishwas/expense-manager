"use client";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.accessToken) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }

          const data: User = await res.json();
          setUser(data);
        } catch (err: any) {
          setError(err.message || "Error fetching user");
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        setError("Not logged in");
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]); // Important to include session and status here!

  if (loading || status === "loading") {
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
        <Typography variant="h4">{user._id}</Typography>
        <Typography variant="h4">{user.name}</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ color: "black", p: 3 }}>
      <Typography variant="h4">User data not available.</Typography>
    </Box>
  );
}
