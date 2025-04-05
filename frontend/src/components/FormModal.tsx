'use client'
import { Button, Modal , Box } from '@mui/material';
import React from 'react'
interface Props {
  children: React.ReactElement<{ handleClose?: () => void }>;
}

const FormModal = ({children} : Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <Button color='primary' variant='outlined' sx={{borderWidth : "0.3rem" , borderRadius : "1rem" , marginY : 2}} onClick={handleOpen}>Open Form</Button>
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
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
          {children}
          </Box>
    </Modal>
    </>
  )
}

export default FormModal