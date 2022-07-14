import { QuickSearch } from "examples-react"
import { useNavigate } from "@shopify/hydrogen"
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
      <h1
        style={{
          margin: 0,
          marginRight: "auto",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        Hello Klevu - Hydrogen
      </h1>
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
