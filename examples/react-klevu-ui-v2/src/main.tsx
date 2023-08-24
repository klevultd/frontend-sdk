import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CartContextProvider } from "./cartContext"
import HomePage from "./HomePage"
import { ProductsPage } from "./ProductsPage"
import ProductPage from "./ProductPage"
import { CheckoutPage } from "./CheckoutPage"
import { CategoryPage } from "./CategoryPage"
import { SearchResultPage } from "./SearchResultPage"

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
          <Route path="search" element={<SearchResultPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="cart" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CartContextProvider>,
)
