"use client";
//TODO: Lets try some server actions
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingIcon from "../../../components/ui/LoadingIcon";

const schema = z.object({
  name : z.string().min(5).max(20),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters").max(30),
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    setError
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (formData : RegisterForm) => {
    // const result = await signIn("credentials", {
    //   ...formData,
    //   redirect: false,
    // });

    const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/auth/register" ,{
      method : "POST",
      headers : {"Content-Type" : "application/Json"},
      body : JSON.stringify(formData)
    })

    if (!result?.ok) {
      setError("root" , {
        message : "Login Failed.Try again later",
        type: "validate",

      })
    } else {
      router.replace("/login");      
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
            Sign up
          </Typography>
          <Typography color="error">{errors.root?.message}</Typography>
          <TextField
            color="primary"
            label="Name"
            id="name"
            type="name"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
  
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
  
          <Link color="secondary" fontSize={18} href="/login" >アカウントをお持ちの場合はこちら</Link>
  
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "creating new User..." : "SUBMIT"}
          </Button>
        </form>
      }
    </Box>
  );
}
