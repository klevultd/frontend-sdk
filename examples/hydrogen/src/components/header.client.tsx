import { QuickSearch } from "examples-react"
import { Link, useNavigate } from "@shopify/hydrogen"
import React from "react"
import { getRecordHandle } from "./klevu/utils"
import { Container } from "@mui/material"

export function Header(props: { pathname: string }) {
  const navigate = useNavigate()

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        width: "100%",
        paddingBottom: "3rem",
      }}
    >
      <Link to="/" style={{ marginRight: "auto" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          Hello Klevu - Hydrogen
        </h1>
      </Link>
      <QuickSearch
        label="Search from Klevu"
        currentUrl={props.pathname}
        onProductClick={(product) => {
          navigate(`/products/${getRecordHandle(product)}`)
        }}
        onSearchClick={(q) => {
          navigate(`/search?q=${encodeURIComponent(q)}`)
        }}
      />
    </Container>
  )
}
