import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { App } from "./app"
import { CartContextProvider } from "./cartContext"
import { CategoryPage } from "./routes/CategoryPage"
import { CheckoutPage } from "./routes/CheckoutPage"
import { CustomCategoryPage } from "./routes/CustomCategoryPage"
import { HomePage } from "./routes/HomePage"
import { ProductPage } from "./routes/ProductPage"
import { ProductsPage } from "./routes/ProductsPage"
import { SearchResultPage } from "./routes/SearchResultPage"
import "./style.css"

const container = document.getElementById("root")
export const root = createRoot(container!)
root.render(
  <CartContextProvider>
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
          <Route path="customcategory" element={<CustomCategoryPage />}>
            <Route path=":id" element={<CustomCategoryPage />} />
          </Route>
          <Route path="search" element={<SearchResultPage />} />
          <Route path="cart" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CartContextProvider>
)
