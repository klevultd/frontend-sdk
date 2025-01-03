import { KlevuConfig } from "@klevu/core"
import {
  KlevuButton,
  KlevuCheckbox,
  KlevuInit,
  KlevuQuicksearch,
} from "@klevu/ui-react"
import React from "react"
import { createRoot } from "react-dom/client"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useCart } from "./cartContext"

// This is only for product page data fetching and custom page example
KlevuConfig.init({
  url: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.url
    : "https://eucs29v2.ksearchnet.com/cs/v2/search",
  apiKey: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.apiKey
    : "klevu-164651914788114877",
  enableKlaviyoConnector:
    !!localStorage.getItem("klevu-enable-klaviyo") || false,
  useConsent: !!localStorage.getItem("klevu-use-consent") || false,
  consentGiven: !!localStorage.getItem("klevu-consent-given") || false,
  eventsApiV1Url: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.eventsApiV1Url
    : "",
  eventsApiV2Url: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.eventsApiV2Url
    : "",
  recommendationsApiUrl: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.recommendationsApiUrl
    : "",
  visitorServiceUrl: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.visitorServiceUrl
    : "",
  ipv6ServiceUrl: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.ipv6ServiceUrl
    : "",
  ipv4ServiceUrl: localStorage.getItem("demo-config")
    ? JSON.parse(localStorage.getItem("demo-config"))?.ipv4ServiceUrl
    : "",
})

export const nav = [
  {
    key: "men",
    label: "Men",
    emoji: "🙎‍♂️",
  },
  {
    key: "women",
    label: "Women",
    emoji: "🙍‍♀️",
  },
  {
    key: "men;shoes",
    label: "Men's shoes",
    emoji: "👞",
  },
]

export function App() {
  const navigate = useNavigate()
  const cart = useCart()

  return (
    <KlevuInit
      url={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))?.url
          : "https://eucs29v2.ksearchnet.com/cs/v2/search"
      }
      eventsV1Url={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))?.eventsApiV1Url
          : ""
      }
      eventsV2Url={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))?.eventsApiV2Url
          : ""
      }
      recommendationsApiUrl={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))
              ?.recommendationsApiUrl
          : ""
      }
      visitorServiceUrl={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))?.visitorServiceUrl
          : ""
      }
      ipv6ServiceUrl={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))?.ipv6ServiceUrl
          : ""
      }
      ipv4ServiceUrl={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))?.ipv4ServiceUrl
          : ""
      }
      apiKey={
        localStorage.getItem("demo-config")
          ? JSON.parse(localStorage.getItem("demo-config"))?.apiKey
          : "klevu-164651914788114877"
      }
      enableKlaviyoConnector={
        !!localStorage.getItem("klevu-enable-klaviyo") || false
      }
      useConsent={!!localStorage.getItem("klevu-use-consent") || false}
      consentGiven={!!localStorage.getItem("klevu-consent-given") || false}
      settings={{
        onItemClick(product, event) {
          navigate(`/products/${product.itemGroupId}/${product.id}`)
          event.preventDefault()
          return false
        },
        generateProductUrl(product) {
          return `/products/${product.itemGroupId}/${product.id}`
        },
      }}
      assetsPath="https://resources-webcomponents.klevu.com/latest/klevu-ui"
    >
      <div>
        <header>
          <div className="container">
            <Link to="/">
              <img src="/assets/logo-green.png" alt="Klevu" />
            </Link>
            <ul>
              {nav.map((n) => (
                <li key={n.key}>
                  <Link to={`/category/${n.key}`}>
                    {n.emoji} {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <KlevuQuicksearch />
            <KlevuButton
              onClick={() => navigate("/cart")}
              style={{ whiteSpace: "nowrap" }}
            >
              Cart ({cart.items.length})
            </KlevuButton>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </KlevuInit>
  )
}
