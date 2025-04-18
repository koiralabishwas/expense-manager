"use client";
import { Button, Modal, Box } from "@mui/material";
import React from "react";
interface Props {
  children: React.ReactElement<{ handleClose?: () => void }>;
}

const FormModal = ({ children }: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);
  return (

  );
};

export default FormModal;
