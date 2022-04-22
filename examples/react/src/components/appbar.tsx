import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import React from "react"
import { QuickSearch } from "./quicksearch"
import { Link } from "react-router-dom"
import { CartButton } from "./cartbutton"
import { Divider } from "@mui/material"

const pages = ["Men", "Women"]
const emojis = {
  Men: "🙎‍♂️",
  Women: "🙍‍♀️",
}

const ResponsiveAppBar = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/">
            <div
              style={{
                background: "white",
                padding: "6px",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid green",
              }}
            >
              <img
                style={{ maxHeight: 20 }}
                src="/cropped-klevu-icon-192x192.png"
              ></img>
            </div>
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginRight: "auto",
              marginLeft: "8px",
              gap: "8px",
            }}
          >
            {pages.map((page) => (
              <Link key={page} to={`/category/${page}`}>
                <Button
                  sx={{ my: 2, display: "block" }}
                  variant="outlined"
                  color="secondary"
                >
                  {emojis[page]} {page}
                </Button>
              </Link>
            ))}
          </Box>
          <QuickSearch />
          <Divider />
          <CartButton />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
