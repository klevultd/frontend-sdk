import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import React from "react"
import { Search } from "./search"
import { Link } from "react-router-dom"

const pages = ["Men", "Women", "Accessories"]

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              LOGO
            </Typography>
          </Link>
          <Box
            sx={{ display: "flex", flexDirection: "row", marginRight: "auto" }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Search />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
