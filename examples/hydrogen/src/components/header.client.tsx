import { QuickSearch } from "examples-react"
import { useNavigate } from "@shopify/hydrogen"
import React from "react"
import { getRecordHandle } from "./klevu/utils"

export function Header(props: { pathname: string }) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
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
        enablePersonalisation
        onProductClick={(product) => {
          navigate(`/products/${getRecordHandle(product)}`)
        }}
      />
    </div>
  )
}
