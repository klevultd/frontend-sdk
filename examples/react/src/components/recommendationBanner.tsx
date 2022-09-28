import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import { KlevuRecord } from "@klevu/core"
import { Product } from "./product"
import React from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function RecommendationBanner(props: {
  products: KlevuRecord[]
  title: string
  productClick: (
    productId: string,
    variantId?: string,
    product?: KlevuRecord,
    index?: number
  ) => void
}) {
  const navigate = useNavigate()

  if (!props.products || props.products.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <Typography
        style={{
          margin: "3rem 0 1rem",
        }}
        variant="h4"
      >
        {props.title}
      </Typography>
      <Swiper
        // install Swiper modules
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          400: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          800: {
            slidesPerView: 4,
          },
        }}
        navigation
      >
        {props.products.map((p, index) => (
          <SwiperSlide
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Product
              hideAddToCart
              product={p}
              onClick={(event) => {
                props.productClick(p.id, p.itemGroupId, p, index + 1)
                navigate(`/products/${p.itemGroupId}/${p.id}`)
                //comment line above and uncomment this line to test full page reload and seeing that analytics will be called on next page load.
                //window.location.href = `http://localhost:3001/products/${p.itemGroupId}/${p.id}`
                event.preventDefault()
                return false
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </React.Fragment>
  )
}
