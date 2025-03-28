"use client";

import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {Settings, Logout } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { signIn, signOut, useSession } from "next-auth/react";
import LoadingIcon from "./ui/LoadingIcon";

const TopBar = () => {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    console.log(anchorEl)
  };

  return (
    <AppBar position="absolute" sx={{ boxShadow: "none" }}>
      <Toolbar variant="dense" disableGutters >
        {/* User Initial Icon or Placeholder */}
        <IconButton
          size="large"
        >
          <MenuIcon fontSize="large"/>
        </IconButton>

        {/* Title */}
        <Typography fontSize={25} sx={{ flexGrow: 1 }}>
          家計師くん
        </Typography>

        {/* Auth Buttons */}
        {status === "loading" ? (
          <LoadingIcon />
        ) : status === "unauthenticated" ? (
          <Button
            color="secondary"
            variant="contained"
            sx={{ borderRadius: 3 }}
            onClick={() => signIn()}
          >
            Log in
          </Button>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="large"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 40, height: 40 , color:"black" }}>
                  {session?.user?.name?.[0] ?? "U"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar />My Profile
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
