import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getCurrentYearMonth } from "@/lib/utils";
import { DateTime } from "luxon";
import { Typography, TextField, MenuItem, Button } from "@mui/material";
import { Box } from "@mui/system";
import DatePickerUI from "./ui/DatePickerUI";
import { IncomeForm, IncomeSchema } from "./IncomeForm";
import { putIncome } from "@/server/income.server";
import { UserT } from "@/types/user";

interface Props {
  record: Income;
  setOpenModal: () => void;
}

export default function EditIncomeForm(props: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IncomeForm>({
    resolver: zodResolver(IncomeSchema),
    defaultValues: {
      amount: props.record.amount,
      description: props.record.description,
      date: props.record.date ? new Date(props.record.date) : undefined,
      genre: props.record.genre,
    },
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserT>(["user"]);
  const incomeGenres = user?.preferences?.incomeGenres ?? [];
  const searchParams = useSearchParams();

  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const onSubmit: SubmitHandler<IncomeForm> = async (formdata: IncomeForm) => {
    const result = await putIncome(props.record._id, formdata);

    if (!result) {
      setError("root", {
        message: "request failed",
      });
    }

    reset();
    queryClient.invalidateQueries({ queryKey: ["incomes", yearMonth] });
    props.setOpenModal();
  };

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
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <TextField
              {...field} // Automatically passes onChange, onBlur, value, ref
              select
              label="種類"
              error={!!errors.genre}
              helperText={errors.genre?.message}
              variant="outlined"
              margin="normal"
              fullWidth
              // IMPORTANT: If the user has a "legacy" genre that is no longer in their
              // preferences list, we must ensure it still appears in the dropdown options.
              // Otherwise, the field will look empty.
            >
              {/* 1. Map the available genres from user settings */}
              {incomeGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}

              {/* 2. Fallback: If the current record's genre is NOT in the list, add it as a hidden/disabled or extra option so it displays */}
              {!incomeGenres.includes(props.record.genre) && (
                <MenuItem key={props.record.genre} value={props.record.genre}>
                  {props.record.genre} (ジャンル削除済み)
                </MenuItem>
              )}
            </TextField>
          )}
        />

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
  );
}
