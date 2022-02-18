import React from "react"
import ReactDOM from "react-dom"
import { KlevuConfig } from "@klevu/core"
import { App } from "./app"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./routes/Home"
import { Products } from "./routes/Products"
import { Product } from "./routes/Product"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />}>
          <Route path=":id" element={<Product />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("reactroot")
)
