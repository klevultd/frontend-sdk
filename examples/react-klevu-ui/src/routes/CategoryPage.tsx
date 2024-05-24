import React, { Fragment, useCallback } from "react"
import { createRoot } from "react-dom/client"
import { useParams } from "react-router-dom"
import {
  KlevuButton,
  KlevuMerchandising,
  KlevuRecommendations,
} from "@klevu/ui-react"
import { nav } from "../app"
import { KlevuRecord } from "@klevu/core"
import { useCart } from "../cartContext"

export function CategoryPage() {
  const params = useParams()
  const cart = useCart()
  const navItem = nav.find((n) => n.key === params.id)

  return (
    <Fragment>
      <KlevuMerchandising
        category={params.id}
        categoryTitle={navItem.label}
      ></KlevuMerchandising>
      <KlevuRecommendations
        recommendationTitle="Category Page"
        recommendationId={
          localStorage.getItem("demo-config")
            ? JSON.parse(localStorage.getItem("demo-config"))
                ?.categoryPageRecommendationId
            : "k-c0013603-1783-4293-bf80-7b3002587dcb"
        }
        currentProductId={params.id}
        itemGroupId={params.groupId}
        categoryPath={params.id}
      ></KlevuRecommendations>
    </Fragment>
  )
}
