import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
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
            <img style={{maxHeight: 20}} src="/cropped-klevu-icon-192x192.png"></img>
          </Link>
          <Box
            sx={{ display: "flex", flexDirection: "row", marginRight: "auto" }}
          >
            {pages.map((page) => (
              <Link to={`/category/${page}`}>
                <Button
                  key={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Search />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
