import {
  KlevuButton,
  KlevuDrawer,
  KlevuIcon,
  KlevuInit,
  KlevuPopup,
  KlevuProduct,
  KlevuQuicksearch,
  KlevuSearchField,
} from "@klevu/ui-react"
import KlevuLogo from "/klevu.svg"
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import { BANNER_ID, CATEGORY_ID, SEARCH_API_KEY, SEARCH_URL } from "./constants"
import { RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useCart } from "./cartContext"
import { createRoot } from "react-dom/client"
import { KlevuConfig } from "@klevu/core"

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const apiKeyRef = useRef<HTMLInputElement>()
  const drawerRef = useRef<HTMLKlevuDrawerElement>()
  const popupRef = useRef<HTMLKlevuPopupElement>()
  const storeUrlRef = useRef<HTMLInputElement>()
  const recsIdRef = useRef<HTMLInputElement>()
  const categoryRef = useRef<HTMLInputElement>()
  const cart = useCart()
  const updateStoreSettings = () => {
    navigate(
      `/?apiKey=${apiKeyRef.current.value}&url=${storeUrlRef.current.value}&categoryId=${categoryRef.current.value}&recsId=${recsIdRef.current.value}`,
    )
    window.location.reload()
  }
  const settings = {
    onItemClick(product, event) {
      navigate(`/products/${product.itemGroupId}/${product.id}`)
      event.preventDefault()
      return false
    },
    generateProductUrl(product) {
      return `/products/${product.itemGroupId}/${product.id}`
    },
    renderPrice(amount, currency) {
      return `${currency} -- ${amount}`
    },
  }
  const apiKey = searchParams.get("apiKey") || SEARCH_API_KEY
  const url = searchParams.get("url") || SEARCH_URL
  const recsId = searchParams.get("recsId") || BANNER_ID
  const categoryId = searchParams.get("categoryId") || CATEGORY_ID
  useMemo(() => {
    KlevuConfig.init({
      url: `https://${url}/cs/v2/search`,
      apiKey,
    })
  }, [])
  // console.log({ apiKey, url, reinit })
  return (
    <>
      <div className="storeSettings">
        Store Info:
        <div>
          <label htmlFor="apiKey">API Key</label>
          <input
            name="apiKey"
            type="text"
            ref={apiKeyRef}
            defaultValue={apiKey}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input name="url" type="text" ref={storeUrlRef} defaultValue={url} />
        </div>
        <div>
          <label htmlFor="url">Recs Id</label>
          <input
            name="recsId"
            type="text"
            ref={recsIdRef}
            defaultValue={recsId}
          />
        </div>
        <div>
          <label htmlFor="url">Category Id</label>
          <input
            name="category"
            type="text"
            ref={categoryRef}
            defaultValue={categoryId}
          />
        </div>
        <button type="button" onClick={updateStoreSettings}>
          Update
        </button>
      </div>

      <KlevuInit
        url={`https://${url}/cs/v2/search`}
        apiKey={apiKey}
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
      >
        <nav className="topbar">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate("/")
            }}
            className="klevuLogo"
          >
            <img
              src="https://klevu.com/klevu-logo/green-white.png"
              alt="Klevu Web components Demo"
            />
          </a>
          <p className="info">Klevu WebComponents Demo</p>
          <ul>
            <li>
              <KlevuQuicksearch
                searchFieldVariant="default"
                placeholder="Search here"
                renderProductSlot={(product, slot) => {
                  if (slot === "bottom") {
                    const div = document.createElement("div")
                    createRoot(div).render(
                      <KlevuButton
                        onClick={() => {
                          cart.add(product)
                        }}
                      >
                        <KlevuIcon name="Add" /> Add to cart
                      </KlevuButton>,
                    )
                    return div
                  }
                  return null
                }}
              />
            </li>
            <li>
              <div>
                <KlevuPopup
                  ref={popupRef}
                  anchor="bottom-start"
                  start-open={false}
                  onKlevuPopupClose={() => setSearchSuggestions([])}
                >
                  <KlevuSearchField
                    slot="origin"
                    limit={5}
                    placeholder="Klevu search field"
                    variant="pill"
                    searchProducts
                    onKlevuSearchResults={(param) => {
                      // console.log(
                      //   "onKlevuSearchResults",
                      //   param.detail.search.responseObject.apiResponse
                      //     .queryResults[0].records,
                      // )
                      setSearchSuggestions(
                        param.detail.search.responseObject.apiResponse
                          .queryResults[0].records,
                      )
                      popupRef.current.openModal()
                    }}
                  />
                  <div slot="content">
                    {searchSuggestions.map((product) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          padding: "10px",
                        }}
                      >
                        <img src={product.image} width="30px" alt="" />
                        <b>{product.name}</b> (
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: product.currency,
                        }).format(product.price)}
                        )
                      </div>
                    ))}
                  </div>
                </KlevuPopup>
              </div>
            </li>
            <li style={{ float: "right" }}>
              <KlevuButton slot="origin">
                <span
                  id="shoppingCartButton"
                  style={{ whiteSpace: "nowrap" }}
                  // onClick={() => navigate("/cart")}
                >
                  <KlevuIcon name="shopping_cart" id="shoppingCart" />
                  <span>Cart ({cart.items?.length || 0})</span>
                </span>
              </KlevuButton>
              {/* <KlevuDrawer anchor="right" ref={drawerRef}>
                  <KlevuButton slot="origin">
                    <span
                      id="shoppingCartButton"
                      style={{ whiteSpace: "nowrap" }}
                      // onClick={() => navigate("/cart")}
                    >
                      <KlevuIcon name="shopping_cart" id="shoppingCart" />
                      <span>Cart ({cart.items?.length || 0})</span>
                    </span>
                  </KlevuButton>
                  <div slot="content">
                    <h3
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Your Cart</span>
                      <button
                        onClick={() => {
                          if (drawerRef.current) drawerRef.current.closeModal()
                        }}
                      >
                        <KlevuIcon name="close" />
                      </button>
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {cart.items.length > 0 ? (
                        cart.items.map((p, i) => (
                          <KlevuProduct product={p} key={i}>
                            <div slot="bottom" className="buttonParent">
                              <KlevuButton
                                onClick={() => {
                                  cart.remove(p.id)
                                }}
                                fullWidth={true}
                              >
                                Remove
                              </KlevuButton>
                            </div>
                          </KlevuProduct>
                        ))
                      ) : (
                        <h2 style={{ color: "red" }}>Your cart is empty</h2>
                      )}
                    </div>
                  </div>
                </KlevuDrawer> */}
            </li>
          </ul>
        </nav>

        <main>
          <Outlet context={{ apiKey, storeUrlRef, recsId, categoryId }} />
        </main>
      </KlevuInit>
    </>
  )
}

export default App
