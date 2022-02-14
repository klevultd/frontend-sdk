import { Box } from "@mui/material"
import React from "react"
import ResponsiveAppBar from "./appbar"
import { ProductGrid } from "./productgrid"

export function App() {
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Box p={2}>
        <ProductGrid />
      </Box>
    </React.Fragment>
  )
}
