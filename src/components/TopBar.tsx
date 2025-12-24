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
import { Settings, Logout } from "@mui/icons-material";
import { signIn, signOut, useSession } from "next-auth/react";
import TopDrawer from "./ui/TopDrawer";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const { data: sessions, status } = useSession();
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    console.log(anchorEl);
  };


  if (status === "loading") {
    return null; // or a loading spinner
  }

  return (
    <AppBar position="sticky" sx={{ boxShadow: "none" }}>
      <Toolbar variant="dense" disableGutters>
        {/* User Initial Icon or Placeholder */}
        {/* Title */}
        <Typography
          onClick={() => router.push('/') }
          fontSize={25}
          sx={{ flexGrow: 1, pl: 1, cursor: "pointer" }}
        >
          家計師くん
        </Typography>

        {/* Auth Buttons */}
        {!sessions?.user ? (
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
                <Avatar sx={{ width: 40, height: 40, color: "black" }}>
                  {sessions?.user?.name?.[0] ?? "?"}
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
                <Avatar />
                My Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => router.push('/preferences')}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Preferences
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
                <TopDrawer />

      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
