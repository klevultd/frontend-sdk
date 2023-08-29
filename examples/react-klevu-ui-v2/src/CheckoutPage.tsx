import {
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  kmcRecommendation,
} from "@klevu/core"
import {
  KlevuButton,
  KlevuProduct,
  KlevuProductGrid,
  KlevuRecommendations,
  KlevuSlides,
} from "@klevu/ui-react"
import groupBy from "lodash/groupBy"
import React, { Fragment, useEffect, useState } from "react"
import { useCart } from "./cartContext"
import "react-multi-carousel/lib/styles.css"
import Carousel from "react-multi-carousel"

const carousalProp = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
  },
  tabletMax: {
    breakpoint: { max: 768, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
}

export function CheckoutPage() {
  const cart = useCart()
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const fetchRecommendation = async (recsId: string) => {
    const res = await KlevuFetch(
      kmcRecommendation(recsId, {
        id: "recommendation",
        // cartProductIds: this.cartProductIds,
        // categoryPath: this.categoryPath,
        // currentProductId: this.currentProductId,
        // itemGroupId: this.itemGroupId,
      }),
    )

    const responseObject = res.queriesById("recommendation")
    if (responseObject) {
      setProducts(responseObject.records)
    }
  }
  useEffect(() => {
    fetchRecommendation("k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d")
  }, [])
  const buy = () => {
    const groupedProducts = groupBy(cart.items, (i) => i.id)
    const items = Object.entries(groupedProducts).map((entry) => {
      const data: KlevuRecord[] = entry[1] as KlevuRecord[]
      return {
        amount: data.length,
        product: data[0],
        override: {},
      }
    })
    KlevuEvents.buy({ items })

    cart.clear()
  }

  const clear = () => {
    cart.clear()
  }

  return (
    <div id="checkoutProductGrid">
      <h2> Checkout - products in cart</h2>
      <div>
        <KlevuProductGrid>
          {cart.items.map((p, i) => (
            <KlevuProduct product={p} key={i} />
          ))}
        </KlevuProductGrid>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          margin: "16px 0",
        }}
      >
        <KlevuButton onClick={clear}>Clear</KlevuButton>
        <KlevuButton onClick={buy} disabled={cart.items.length === 0}>
          Buy products
        </KlevuButton>
      </div>
      <KlevuSlides heading={"My Recommendation"}>
        {products.map((product) => (
          <KlevuProduct
            product={product}
            style={{
              "--klevu-product-width": "300px",
              "text-align": "center",
            }}
          >
            <div slot="top">
              <h4>{product.name}</h4>
            </div>
            <div slot="image">
              <img src={product.image} width="100px" alt="" />
            </div>
            <div slot="info">
              <button>Add to cart</button>
            </div>
            <div slot="info">
              <h4>{product.price}</h4>
            </div>
          </KlevuProduct>
        ))}
      </KlevuSlides>
      <h3>React Carousel</h3>
      <Carousel responsive={carousalProp} autoPlay={false}>
        {products.map((product) => (
          <KlevuProduct
            product={product}
            style={{
              "--klevu-product-width": "300px",
              "text-align": "center",
            }}
          >
            <div slot="top">
              <h4>{product.name}</h4>
            </div>
            <div slot="image">
              <img src={product.image} width="100px" alt="" />
            </div>
            <div slot="info">
              <button>Add to cart</button>
            </div>
            <div slot="info">
              <h4>{product.price}</h4>
            </div>
          </KlevuProduct>
        ))}
      </Carousel>
    </div>
  )
}
