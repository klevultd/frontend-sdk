import { Box } from "@mui/material"
import React from "react"
import ResponsiveAppBar from "./components/appbar"
import { Outlet } from "react-router-dom"
import { SnackbarProvider } from "notistack"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { lightBlue, green } from "@mui/material/colors"
import { CartContextProvider } from "./cartContext"

const theme = createTheme({
  palette: {
    primary: green,
    secondary: lightBlue,
  },
})

export function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CartContextProvider>
        <ThemeProvider theme={theme}>
          <ResponsiveAppBar />
          <Box p={2} style={{ marginTop: "80px" }}>
            <Outlet />
          </Box>
        </ThemeProvider>
      </CartContextProvider>
    </SnackbarProvider>
  )
}
