import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

const TopBar = () => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton
          size="large" // Slightly smaller button
          edge="start"
          color="inherit"
          aria-label="menu"
        >
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar