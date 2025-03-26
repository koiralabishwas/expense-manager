"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingIcon from "../components/ui/LoadingIcon";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters").max(30),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    setError
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (formData : LoginForm) => {
    const result = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (!result?.ok) {
      setError("root" , {
        message : "Login Failed.Try again later",
        type: "validate",

      })
    } else {
      router.replace("/");
      // Optionally handle error message here
      
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);



  return (
    <Box maxWidth={400} mx="auto" mt={6} px={2}>
      {status === "loading" && <LoadingIcon/>}
      {status === "unauthenticated" &&
        <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
          Log in
        </Typography>
        <Typography color="error">{errors.root?.message}</Typography>
        <TextField
          color="primary"
          label="Email"
          id="email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <Link color="secondary" href="/register">新規登録はこちら</Link>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </form>
      }
      
    </Box>
  );
}
