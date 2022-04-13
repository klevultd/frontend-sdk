import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { KlevuRecord } from "@klevu/core"
import { Product } from "./product"
import React from "react"
import { Typography } from "@mui/material"

export function RecommendationBanner(props: {
  products: KlevuRecord[]
  title: string
  productClick: (productId: string, variantId?: string) => void
}) {
  if (props.products.length === 0) {
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
        slidesPerView={4}
        navigation
      >
        {props.products.map((p) => (
          <SwiperSlide
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Product
              product={p}
              onClick={() => {
                props.productClick(p.id, p.itemGroupId)
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </React.Fragment>
  )
}
