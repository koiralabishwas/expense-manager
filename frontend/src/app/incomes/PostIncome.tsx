"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { number, string, z } from "zod";

export const IncomeGenre = z.enum([
  "Salary",
  "Gratuity",
  "Allowence",
  "Bonus",
  "Other",
]);

const schema = z.object({
  // description , amount , genre , currency
  description: string().min(1).max(50),
  genre: IncomeGenre,
  amount: number(),
  currency: string()
    .regex(/^[A-Z]{3}/, "must be 3 digit currency Code")
    .default("JPY"),
});

type IncomeForm = z.infer<typeof schema>;

type FormFeild = {
  name: keyof IncomeForm;
  label: string;
  type: "text" | "number" | "select";
  placeholder: string;
  default?: String;
  color?: "primary" | "secondary";
  options?: string[];
};
const formFeilds: FormFeild[] = [
  {
    name: "description",
    placeholder: "description of the expense",
    label: "Description",
    type: "text",
  },
  {
    name: "amount",
    label: "Amount",
    placeholder: "200",
    type: "number",
  },
  {
    name: "currency",
    label: "Currency",
    color: "secondary",
    placeholder: "JPY",
    default: "JPY",
    type: "text",
  },
  {
    name: "genre",
    label: "Genre",
    type: "select",
    placeholder: "Salary",
    default: "Salary",
    options: IncomeGenre.options,
  },
];

const postIncome = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IncomeForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IncomeForm> = async (formData: IncomeForm) => {
    const result = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/incomes",
      {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        method: "POST",
      }
    );

    if (!result.ok) {
      setError("root", {
        message: "request failed",
      });
    } else {
      //TODO:
      // router.refresh();
      console.log("ok");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6} px={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
          収入登録
        </Typography>
        <Typography color="error">{errors.root?.message}</Typography>
        {formFeilds.map((field) =>
          field.type === "text" || field.type === "number" ? (
            <TextField
              key={field.name}
              id={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={field.default}
              {...register(
                field.name,
                field.type === "number" ? { valueAsNumber: true } : {}
              )}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message}
              variant="outlined"
              margin="normal"
              fullWidth
            />
          ) : (
            <TextField
              select
              key={field.name}
              id={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={field.default}
              {...register(field.name)}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message}
              variant="outlined"
              margin="normal"
              fullWidth
            >
              {field.options?.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          )
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting" : "SUBMIT"}
        </Button>
        <Button
          type="reset"
          color="error"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          RESET
        </Button>
      </form>
    </Box>
  );
};

export default postIncome;
