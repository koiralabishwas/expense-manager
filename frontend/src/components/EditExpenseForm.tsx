import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ExpenseForm, ExpenseGenre, ExpenseSchema } from "./ExpenseForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getCurrentYearMonth } from "@/lib/utils";
import { DateTime } from "luxon";
import { putExpense } from "@/app/actions/expense.server";
import { Typography, TextField, MenuItem, Button } from "@mui/material";
import { Box } from "@mui/system";
import DatePickerUI from "./ui/DatePickerUI";

interface Props {
  record: Expense
  setOpenModal : () => void
}

export default function EditExpenseForm(props: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ExpenseForm>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      amount: props.record.amount,
      description: props.record.description,
      date: props.record.date ? new Date(props.record.date) : undefined,
      genre: props.record.genre as z.infer<typeof ExpenseGenre>
    }
  })

  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth()

  const onSubmit: SubmitHandler<ExpenseForm> = async (formdata: ExpenseForm) => {
    const result = await putExpense(props.record._id, formdata)

    if (!result) {
      setError("root", {
        message: "request failed",
      });
    }

    reset();
    queryClient.invalidateQueries({ queryKey: ['expenses', yearMonth] });
    props.setOpenModal()
  }

  return (
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
        <TextField
          key={"amount"}
          id="amount"
          label="金額"
          type="number"
          placeholder="金額を数字で入力"
          {...register('amount', { valueAsNumber: true })}
          error={!!errors["amount"]}
          helperText={errors["amount"]?.message}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          select
          defaultValue={props.record.genre}
          key={"genre"}
          id="genre"
          label="種類"
          type="text"
          placeholder="出費の種類を選択"
          {...register('genre')}
          error={!!errors["genre"]}
          helperText={errors["genre"]?.message}
          variant="outlined"
          margin="normal"
          fullWidth>

          {ExpenseGenre.options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          key={"description"}
          id="description"
          label="概要"
          type="text"
          placeholder="出費の概要"
          {...register("description")}
          error={!!errors["description"]}
          helperText={errors["description"]?.message}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {/*TODO:　これを理解 */}
        {/* control では　...register がつかえないみたい,だから name をつかうみたい */}
        <Controller
          name="date"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePickerUI
              value={value ? DateTime.fromJSDate(value) : null}
              onChange={(dt) => {
                const selectedDate = dt ? dt.toJSDate() : null;
                onChange(selectedDate);
              }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting...." : "SUBMIT"}
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
  )
}
