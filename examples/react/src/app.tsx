import { Box } from "@mui/material"
import React from "react"
import ResponsiveAppBar from "./components/appbar"
import { Outlet } from "react-router-dom"

export function App() {
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Box p={2}>
        <Outlet />
      </Box>
    </React.Fragment>
  )
}
