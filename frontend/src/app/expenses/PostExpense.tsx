"use client";

import { getCurrnentYearMonth } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { number, string, z } from "zod";

const ExpenseGenre = z.enum([
  "Water",
  "Drinks",
  "Meal",
  "Snacks",
  "Groceries",
  "Entertainment",
  "Devices",
  "Hangouts",
  "Study",
  "Clothing",
  "Other",
]);

const schema = z.object({
  description: string().min(1).max(50),
  genre: ExpenseGenre,
  amount: number(),
  currency: string()
    .regex(/^[A-Z]{3}/, "must be 3 digit currency Code")
    .default("JPY"),
});

export type ExpenseForm = z.infer<typeof schema>

type FormFeild = {
  name : keyof ExpenseForm
  label : string 
  type : 'text' |  "number"| "select"
  placeholder : string
  default? : string
  color? : "primary" | "secondary"
  options? : string[] 
}

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
    name: "genre",
    label: "Genre",
    type: "select",
    placeholder: "Water",
    default: "Water",
    options: ExpenseGenre.options,
  },
  {
    name: "currency",
    label: "Currency",
    color: "secondary",
    placeholder: "JPY",
    default: "JPY",
    type: "text",
  },
];

interface Props {
  onPost : (expense : any) => void
}

const PostExpense = ({onPost} : Props) => {
  const {data : session , status} = useSession() 
  const {
    register , 
    handleSubmit , 
    setError,
    reset , 
    formState : {errors , isSubmitting , isSubmitSuccessful}
  } = useForm<ExpenseForm>({
    resolver : zodResolver(schema)
  })

  const params = useSearchParams();
  const yearMonth = params.get('yearMonth') || getCurrnentYearMonth();

  const onSubmit : SubmitHandler<ExpenseForm> = async (formData : ExpenseForm) => {
    // async await はだめだけど、try catch は通る

    const req = { ...formData, yearMonth };
    const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/expenses", {
      body: JSON.stringify(req),
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
      },
      method: "POST",
    });
    if (!result.ok) {
      setError("root", {
      message: "request failed",
      });
    } else {
      const expense = await result.json();
      reset();
      onPost(expense);
    }
  }
  return(
    <Box maxWidth={400} mx="auto" mt={6} px={2}>
      <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
        支出登録
      </Typography>
      <Typography color="error">{errors.root?.message}</Typography>
      {isSubmitSuccessful && (
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="h5" color="success" fontWeight="bold">
            支出を登録しました
          </Typography>
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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

export default PostExpense;
