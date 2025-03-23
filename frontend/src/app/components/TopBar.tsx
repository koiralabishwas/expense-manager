'use  client'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const TopBar = () => {
  const {data : session , status} = useSession()
  return (
    <AppBar
      position="absolute"
      sx={{ backgroundColor: "white", color: "red", boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>

        {status === "loading" ? (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ..loading..
          </Typography>
        ) : session ? (
          <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {session.user?.name}
          </Typography>
          <Button color="inherit" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => signIn()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
