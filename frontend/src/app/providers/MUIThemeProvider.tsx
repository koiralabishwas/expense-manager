'use client'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
interface Props{
  children :ReactNode
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00b908',
      contrastText: '#ffffff',
      light: '#06ff0c',
      dark: '#00a007',
    },
    secondary: {
      main: '#2796e8',
      light: '#468bd8',
      dark: '#024ca0',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#c76d04',
      light: '#ff8115',
      contrastText: '#ffffff',
      dark: '#9e5302',
    },
    info: {
      main: '#a2a2a2',
      light: '#dedede',
      dark: '#434343',
      contrastText: 'rgba(189,189,189,0.87)',
    },
    success: {
      main: '#26ff2d',
      contrastText: '#ffffff',
      light: '#28c0ff',
      dark: '#d32aff',
    },
    text: {
      primary: '#000000',
      secondary: '#181818',
      disabled: 'rgba(133,133,133,0)',
    },
    background: {
      default: '#c7c7c7',
      paper: '#d9ded9',
    },
    error: {
      main: '#ff0b00',
      contrastText: '#ffffff',
      light: '#ff453d',
      dark: '#ad0b00',
    },
  },
};

const theme = createTheme(themeOptions)


const MUIThemeProvider = ({children} : Props) => {
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}
 
 export default MUIThemeProvider