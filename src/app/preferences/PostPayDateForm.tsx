import FormModal from "@/components/FormModal";
import { editCreditPaymentTiming } from "@/server/preference.server";
import { CreditPaymentTiming } from "@/types/user";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

interface Props {
  creditPaymentTiming: CreditPaymentTiming;
}

const PostPayDateForm = (props: Props) => {
  const [delayMonth, setDelayMonth] = React.useState(
    props.creditPaymentTiming.delayMonth
  );
  const queryClient = useQueryClient();

  const submitfn = async (formData: FormData) => {
    const paymentFormData: CreditPaymentTiming = {
      delayMonth: Number(formData.get("delayMonth")),
      day: Number(formData.get("day")),
    };
    await editCreditPaymentTiming(paymentFormData);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    window.close();
  };

  return (
    <FormModal label={"変更"}>
      <Box sx={{display : "flex" , flexDirection : "column" , gap : "0.5rem"}} component={"form"} action={submitfn}>
        <TextField
          fullWidth
          defaultValue={props.creditPaymentTiming.day}
          type="number"
          name="day"
          label="支払日"
          slotProps={{
            htmlInput: {
              min: 1,
              max: 31,
            },
          }}
          required
        />
        <Select
          fullWidth
          name="delayMonth"
          value={delayMonth}
          onChange={(e) => setDelayMonth(e.target.value)}
        >
          <MenuItem key={1} value={1}>
            翌月
          </MenuItem>
          <MenuItem key={2} value={2}>
            翌々月
          </MenuItem>
          <MenuItem key={3} value={3}>
            翌々々月
          </MenuItem>
        </Select>
        <Button fullWidth variant="contained" type="submit">変更</Button>
      </Box>
    </FormModal>
  );
};

export default PostPayDateForm;
