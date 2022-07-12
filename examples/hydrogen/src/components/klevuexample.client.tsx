import { QuickSearch } from "examples-react"
import { useNavigate } from "@shopify/hydrogen"
import React from "react"
import { getRecordHandle } from "./klevu/utils"

export function KlevuExample(props: { pathname: string }) {
  const navigate = useNavigate()

  return (
    <QuickSearch
      label="Search from Klevu"
      currentUrl={props.pathname}
      enablePersonalisation
      onProductClick={(product) => {
        navigate(`/products/${getRecordHandle(product)}`)
      }}
    />
  )
}
