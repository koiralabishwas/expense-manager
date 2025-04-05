"use client";
import React, { useActionState } from "react";
import { postExpense } from "./action";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const initialState = {
  message: "",
};

const genreOptions = [
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
];

const PostExpense = () => {
  const [state, formAction, pending] = useActionState(
    postExpense,
    initialState
  );
  return (
    <Box maxWidth={400} mx={"auto"} mt={6} px={2}>
      <form action={formAction}>
        <TextField
          label="description"
          id="description"
          name="description"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="amount"
          id="amount"
          name="amount"
          type="number"
          margin={"normal"}
          required
          fullWidth
        />
        <TextField
          select
          label="genre"
          id="genre"
          name="genre"
          margin="normal"
          defaultValue={"Water"}
          required
          fullWidth
        >
          {genreOptions.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="currency"
          id="currency"
          name="currency"
          defaultValue={"JPY"}
          margin="normal"
          required
          fullWidth
        />
        {state?.message && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {state.message}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={pending}
          fullWidth
          sx={{ mt: 2 }}
        >
          {pending ? "submitting.." : "submit"}
        </Button>
      </form>
    </Box>
  );
};

export default PostExpense;
