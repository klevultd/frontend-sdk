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

export const pages = ["Men", "Women", "Men's shoes"]
export const links = ["Men", "Women", "men;shoes"]
const emojis = {
  Men: "🙎‍♂️",
  Women: "🙍‍♀️",
  "Men's shoes": "👞",
}

const ResponsiveAppBar = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/">
            <img
              src="/logo-green.png"
              alt="Klevu"
              style={{
                height: "20px",
                marginRight: "10px",
                marginTop: "7px",
              }}
            />
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
            {pages.map((page, index) => (
              <Link key={page} to={`/category/${links[index]}`}>
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
          <Divider
            flexItem
            orientation="vertical"
            style={{ margin: "0 8px" }}
          />
          <QuickSearch label="Quick Search" />
          <Divider
            flexItem
            orientation="vertical"
            style={{ margin: "0 8px" }}
          />
          <QuickSearch label="QS with personalisation" enablePersonalisation />
          <Divider
            flexItem
            orientation="vertical"
            style={{ margin: "0 8px" }}
          />
          <CartButton />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
