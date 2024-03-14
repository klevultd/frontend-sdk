import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import React from "react"
import { QuickSearch } from "./quicksearch"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CartButton } from "./cartbutton"
import { Divider, FormControlLabel, Switch } from "@mui/material"
import { config } from "../config"
import { useGlobalVariables } from "../globalVariablesContext"

export const pages = config.nav.map((n) => n.label)
export const links = config.nav.map((n) => n.key)
const emojis = config.nav.reduce((a, v) => ({ ...a, [v.label]: v.emoji }), {})

const ResponsiveAppBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { debugMode, toggleDebugMode } = useGlobalVariables()

  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="xl">
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
                  sx={{ my: 2, display: "block", whiteSpace: "nowrap" }}
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
          <QuickSearch
            label="Quick Search"
            currentUrl={location.pathname}
            onProductClick={(p) => {
              navigate(`/products/${p.itemGroupId}/${p.id}`)
            }}
            onSearchClick={(q) => {
              navigate(`/searchnopersonalisation?q=${encodeURIComponent(q)}`)
            }}
          />
          <Divider
            flexItem
            orientation="vertical"
            style={{ margin: "0 8px" }}
          />
          <QuickSearch
            label="QS with personalisation"
            enablePersonalisation
            currentUrl={location.pathname}
            onProductClick={(p) => {
              navigate(`/products/${p.itemGroupId}/${p.id}`)
              // comment line above and uncomment this to test full page reload. For testing analytical events caching
              // window.location.href = `http://localhost:3001/products/${p.itemGroupId}/${p.id}`
            }}
            onSearchClick={(q) => {
              navigate(`/search?q=${encodeURIComponent(q)}`)
            }}
          />
          <Divider
            flexItem
            orientation="vertical"
            style={{ margin: "0 8px" }}
          />
          <CartButton />
          <Divider
            flexItem
            orientation="vertical"
            style={{ margin: "0 8px" }}
          />
          <FormControlLabel
            style={{ margin: "0 8px", whiteSpace: "nowrap" }}
            control={
              <Switch
                color="error"
                checked={debugMode}
                onChange={(e) => toggleDebugMode(e.target.checked)}
              />
            }
            label="Debug Mode"
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
