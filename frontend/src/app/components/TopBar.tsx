'use client'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import LoadingIcon from "./ui/LoadingIcon";
import { BorderAll, BorderAllOutlined } from "@mui/icons-material";

const TopBar = () => {
  const { data: session, status } = useSession();

  return (
    <AppBar
      position="absolute"
      sx={{ boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          color="secondary"
          sx={{border : 2,marginRight : 1} }
          
        >{session?.user.name[0]}</IconButton>

        <Typography fontSize={25} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          家計師くん
        </Typography>

        {status === "loading" ? (
          <LoadingIcon/>
        ) : status === "unauthenticated" ? (
          <Button color="secondary" sx={{borderWidth : 8 , borderRadius : 3}} variant="contained"  onClick={() => signIn()}>
            Log in
          </Button>
        ) : 
        <Button color="error" sx={{borderWidth : 8 , borderRadius : 3}} variant="contained"  onClick={() => signOut()}>
        Logout
      </Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
