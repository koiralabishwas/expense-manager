import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DatePickerUI from "./ui/DatePickerUI";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { postIncome } from "@/app/actions/income.server";

const IncomeGenre = z.enum([
  "Salary",
  "Gratuity",
  "Allowence",
  "Bonus",
  "Other",
]);

const schema = z.object({
  description: z.string().min(1).max(50),
  genre: IncomeGenre,
  amount: z.number(),
  date: z.date(),
});

export type IncomeForm = z.infer<typeof schema>

interface Props {
  //TODO: make it typesafe 
  onPost: (income: Income) => void
}
export default function IncomeForm(props: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<IncomeForm>({
    resolver: zodResolver(schema)
  })

  const params = useSearchParams().get("yearMonth");
  const currentYearMonth = params
    ? DateTime.fromFormat(params, "yyyyMM").set({ day: DateTime.now().day }).toJSDate()
    : new Date();

  const onSubmit: SubmitHandler<IncomeForm> = async (formdata: IncomeForm) => {
    const result = await postIncome(formdata)

    if (!result) {
      setError("root", {
        message: "request failed",
      });
    }

    reset();
    props.onPost(result)
  }

  return (
    <Box maxWidth={400} mx="auto" mt={6} px={2}>
      <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
        収入登録
      </Typography>
      <Typography color="error">{errors.root?.message}</Typography>
      {isSubmitSuccessful && (
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="h5" color="success" fontWeight="bold">
            収入を登録しました
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
          defaultValue={null}
          {...register('amount', { valueAsNumber: true })}
          error={!!errors["amount"]}
          helperText={errors["amount"]?.message}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          select
          key={"genre"}
          id="genre"
          label="種類"
          type="text"
          placeholder="出費の種類を選択"
          defaultValue={IncomeGenre.options[0]}
          {...register('genre')}
          error={!!errors["genre"]}
          helperText={errors["genre"]?.message}
          variant="outlined"
          margin="normal"
          fullWidth>

          {IncomeGenre.options.map((opt) => (
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
          placeholder="収入の概要"
          defaultValue={null}
          {...register("description")}
          error={!!errors["description"]}
          helperText={errors["description"]?.message}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {/*TODO:　これを理解 */}
        <Controller
          name="date"
          control={control}
          defaultValue={currentYearMonth}// z.date は js の date のためluxonではなく js dateに
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePickerUI
              value={value ? DateTime.fromJSDate(value) : null}
              onChange={(dt) => onChange(dt ? dt.toJSDate() : null)}
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
  )
}
