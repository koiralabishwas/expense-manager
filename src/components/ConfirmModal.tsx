import { Box, Button, Modal, SxProps, Theme, Typography } from '@mui/material';
import React from 'react'

interface Props {
  label: string,
  confirmMessage: string,
  children: (close: () => void) => React.ReactNode;
}

const ConfirmModal = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  return (
    <>
      <Button color='error' variant='outlined' onClick={handleOpen}>{props.label}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "flex",
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='subtitle1'>{props.confirmMessage}</Typography>
            <Box display="flex" gap={2}>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleClose}
            >
              cancel
            </Button>
            {props.children(handleClose)}
            </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ConfirmModal
