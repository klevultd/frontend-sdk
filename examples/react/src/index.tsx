import React from "react"
import { createRoot } from "react-dom/client"
import { KlevuConfig, KlevuKMCSettings } from "@klevu/core"
import { App } from "./app"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./routes/HomePage"
import { ProductsPage } from "./routes/ProductsPage"
import { ProductPage } from "./routes/ProductPage"
import { CategoryPage } from "./routes/CategoryPage"
import { SearchResultPage } from "./routes/SearchResultPage"
import { CheckoutPage } from "./routes/CheckoutPage"
import axios from "axios"
import "swiper/css/bundle"
import { config } from "./config"

KlevuConfig.init({
  ...config,
  axios,
  enableKlaviyoConnector:
    !!localStorage.getItem("klevu-enable-klaviyo") || false,
  useConsent: !!localStorage.getItem("klevu-use-consent") || false,
  consentGiven: !!localStorage.getItem("klevu-consent-given") || false,
})

KlevuKMCSettings()

const container = document.getElementById("reactroot")
const root = createRoot(container!)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />}>
          <Route path=":groupId/:id" element={<ProductPage />} />
        </Route>
        <Route path="category" element={<CategoryPage />}>
          <Route path=":id" element={<CategoryPage />} />
        </Route>
        <Route
          path="search"
          element={<SearchResultPage personlisationEnabled />}
        />
        <Route path="searchnopersonalisation" element={<SearchResultPage />} />
        <Route path="cart" element={<CheckoutPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
