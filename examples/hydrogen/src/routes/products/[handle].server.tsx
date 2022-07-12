import React from "react"

import { useShopQuery, useRouteParams, gql } from "@shopify/hydrogen"
import { Header } from "../../components/header.client"

export default function Product() {
  const { handle } = useRouteParams()

  const {
    data: { product },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
    preload: true,
  })

  if (!product) {
    return "Product not found"
  }

  return (
    <React.Fragment>
      <Header pathname="" />
      <h2>{product.title}</h2>
      <img src={product.featuredImage.url} />
      <pre>{JSON.stringify(product, undefined, 2)}</pre>
    </React.Fragment>
  )
}

const QUERY = gql`
  query product($handle: String!) {
    product: product(handle: $handle) {
      compareAtPriceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          currencyCode
          amount
        }
      }
      description
      descriptionHtml
      featuredImage {
        url
        width
        height
        altText
      }
      handle
      id
      priceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          currencyCode
          amount
        }
      }
      title
      vendor
    }
  }
`
