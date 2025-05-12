import { Box } from "@mui/material"
import React from "react"
import ResponsiveAppBar from "./components/appbar"
import { Outlet } from "react-router-dom"
import { SnackbarProvider } from "notistack"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CartContextProvider } from "./cartContext"
import { Footer } from "./components/footer"
import { LastVisited } from "./components/lastVisited"
import { Container } from "@mui/material"
import ScrollToTop from "./scrollTop"
import { GlobalVariablesContextProvider } from "./globalVariablesContext"
import { KlevuInit, KlevuProductQuery } from "@klevu/ui-react";
import "./app.css";
import { config } from "./config"

const primary = "#97C73E"
const secondary = "#2b556e"

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: "#fff",
    },
    secondary: {
      main: secondary,
    },
    success: {
      main: primary,
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "4rem",
      fontWeight: "normal",
      color: secondary,
    },
    h2: {
      color: secondary,
      fontWeight: "normal",
    },
    h3: {
      color: secondary,
      fontWeight: "normal",
    },
    h4: {
      color: secondary,
      fontWeight: "normal",
    },
    h5: {
      color: secondary,
      fontWeight: "normal",
    },
    h6: {
      color: secondary,
      fontWeight: "normal",
    },
  },
})

export function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={1000}
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
    >
      <ScrollToTop />
      <CartContextProvider>
        <GlobalVariablesContextProvider>
          <ThemeProvider theme={theme}>
            <ResponsiveAppBar />
            <Box p={2} style={{ marginTop: "80px" }}>
              <Outlet />
            </Box>
            <Box
              style={{
                marginTop: "4rem",
                borderTop: `2px solid ${secondary}`,
              }}
            >
              <Container maxWidth="lg">
                <LastVisited />
              </Container>
            </Box>
            <Footer />
            <div style={{position: "fixed", bottom: 10, right: 10}}>
              <KlevuInit apiKey={config.apiKey} url={config.url} moiApiUrl="https://moi-ai-qa.ksearchnet.com/">
              <KlevuProductQuery       
              pqaWidgetId={"pqa-dcb56eb4-0989-4cfe-b006-2cc9e7350957"}
              popupAnchor="top-start"></KlevuProductQuery>
              </KlevuInit>
            </div>
          </ThemeProvider>
        </GlobalVariablesContextProvider>
      </CartContextProvider>
    </SnackbarProvider>
  )
}
