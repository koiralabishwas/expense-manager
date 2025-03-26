'use client'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import LoadingIcon from "./ui/LoadingIcon";

const TopBar = () => {
  const { data: session, status } = useSession();

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >三</IconButton>

        <Typography fontSize={25} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          家計師くん
        </Typography>

        {status === "loading" ? (
          <LoadingIcon/>
        ) : session ? (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {session.user?.name || "User"}
            </Typography>
            <Button color="secondary" sx={{borderWidth : 8 , borderRadius : 3}} variant="contained"  onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="secondary" sx={{borderWidth : 8 , borderRadius : 3}} variant="contained"  onClick={() => signIn()}>
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
