"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItemIcon } from "@mui/material";

export default function TopDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 200 }} onClick={toggleDrawer(false)}>
      <Divider />
      <List>
        {[
          // アイコンを組み込む
          { text: "Home", icon: <InboxIcon /> ,link : "/"},
          { text: "Income", icon: <InboxIcon /> , link : "/incomes" },
          { text: "Expense", icon: <MailIcon /> , link : "/expenses" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => {window.location.href = item.link}}>
              {/* TODO: Income , Expense , Home などの　組み込んだアイコンを入れろ */}
              {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{
          color: "white",
          "&:hover": { backgroundColor: "#0000001a" },
        }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
