import { Box } from "@mui/material"
import React from "react"
import ResponsiveAppBar from "./components/appbar"
import { Outlet } from "react-router-dom"
import { SnackbarProvider } from "notistack"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CartContextProvider } from "./cartContext"
import { Footer } from "./components/footer"

const theme = createTheme({
  palette: {
    primary: {
      main: "#97C73E",
    },
    secondary: {
      main: "#2b556e",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "4rem",
    },
  },
})

export function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
      <CartContextProvider>
        <ThemeProvider theme={theme}>
          <ResponsiveAppBar />
          <Box p={2} style={{ marginTop: "80px" }}>
            <Outlet />
          </Box>
          <Footer />
        </ThemeProvider>
      </CartContextProvider>
    </SnackbarProvider>
  )
}
