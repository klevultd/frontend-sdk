import {
  FilterManager,
  KlevuFilterResultOptions,
  KlevuQueryResult,
  KlevuRecord,
  KlevuSearchSorting,
} from "@klevu/core"
import {
  KlevuAccordion,
  KlevuBadge,
  KlevuButton,
  KlevuFacetList,
  KlevuIcon,
  KlevuLayoutResults,
  KlevuLoadingIndicator,
  KlevuModal,
  KlevuPagination,
  KlevuProduct,
  KlevuProductGrid,
  KlevuQuery,
  KlevuRecommendations,
  KlevuSort,
} from "@klevu/ui-react"
import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "./cartContext"
import { BANNER_ID } from "./constants"
import { useOutletContext } from "react-router-dom"
import { createRoot } from "react-dom/client"

const manager = new FilterManager()

const HomePage = () => {
  const { categoryId } = useOutletContext<{
    apiKey: string
    storeUrlRef: string
    recsId: string
    categoryId: string
  }>()

  const cart = useCart()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [facets, setFacets] = useState([])
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState(KlevuSearchSorting.NameAsc)
  const limit = 24
  const [removeProduct, setRemoveProduct] = useState<KlevuRecord | null>(null)
  const [queryResult, setQueryResult] = useState<KlevuQueryResult>(null)
  const renderProductSlot = useCallback(
    (product: KlevuRecord, slot: string) => {
      if (slot === "bottom") {
        const div = document.createElement("div")
        console.log("cart.items", cart.items)
        div.className = "recsProduct"
        createRoot(div).render(
          cart.items.find((p) => p.id === product.id) ? (
            <KlevuButton
              onClick={() => {
                cart.remove(product.id)
              }}
              fullWidth={true}
            >
              Remove
            </KlevuButton>
          ) : (
            <KlevuButton
              onClick={() => {
                cart.add(product)
              }}
              fullWidth={true}
            >
              Add to cart
            </KlevuButton>
          ),
        )
        return div
      }

      return null
    },
    [cart.items.length],
  )

  console.log({
    queryResult,
    r: queryResult?.records,
    manager,
  })
  return (
    <div>
      {loading && (
        <div className="loader">
          <KlevuLoadingIndicator />
        </div>
      )}
      <div className="recsDiv">
        <h3>Recommendation banner</h3>
        <hr />
        <KlevuRecommendations
          recommendationId={BANNER_ID}
          recommendationTitle="Some title"
          renderProductSlot={renderProductSlot}
        />
        <br />
        <h3>Merchandising</h3>
        <hr />
        <KlevuQuery
          type="merchandising"
          category={categoryId}
          categoryTitle={"Some title"}
          manager={manager}
          limit={limit}
          offset={offset}
          sort={sort}
          onKlevuQueryResult={(event) => {
            setQueryResult(event.detail.result)
            console.log("onklevuQueryResult")
            setLoading(false)
          }}
          updateOnFilterChange
        />
        {queryResult?.records ? (
          <>
            <div className="merchandisingContainer">
              <div className="facetList">
                <KlevuFacetList
                  manager={manager}
                  onKlevuApplyFilters={(e) => {
                    console.log(e.target)
                    setLoading(true)
                  }}
                />
              </div>
              <div>
                {manager.filters.some(
                  (f) =>
                    (f as KlevuFilterResultOptions).options.filter(
                      (o) => o.selected,
                    ).length > 0,
                ) && (
                  <KlevuAccordion
                    start-open
                    style={{ width: "100%", borderTop: "none" }}
                  >
                    <span slot="header">Facets:</span>
                    <div slot="content" className="facetSection">
                      {manager.filters.map((f) =>
                        (f as KlevuFilterResultOptions).options
                          .filter((o) => o.selected)
                          .map((selected) => (
                            <KlevuBadge
                              accent={2}
                              style={{
                                whiteSpace: "nowrap",
                                position: "relative",
                              }}
                            >
                              <span
                                role="button"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  manager.toggleOption(f.key, selected.name)
                                }
                              >
                                <KlevuIcon
                                  name="close"
                                  style={{
                                    marginRight: "5px",
                                    fontSize: "12px",
                                    position: "absolute",
                                    top: "-6px",
                                    right: "-5px",
                                    padding: "1px 4px 0px 4px",
                                    backgroundColor: "#aaa",
                                    color: "white",
                                    borderRadius: "20px",
                                    border: "1px solid white",
                                  }}
                                ></KlevuIcon>
                              </span>
                              <span>
                                <b>{f.label}</b>: {selected.name}
                              </span>
                            </KlevuBadge>
                          )),
                      )}
                    </div>
                  </KlevuAccordion>
                )}
                <div className="productGrid">
                  {queryResult?.records.map((p) => (
                    <KlevuProduct
                      product={p}
                      key={p.id}
                      fixedWidth
                      variant="small"
                    >
                      <div
                        slot="top"
                        className="buttonParent"
                        style={{ marginBottom: "10px", textAlign: "right" }}
                      >
                        <KlevuBadge accent={3}>SALE</KlevuBadge>
                      </div>
                      <div slot="bottom" className="buttonParent">
                        {cart.items.find((_p) => p.id === _p.id) ? (
                          <KlevuButton
                            onClick={() => {
                              setRemoveProduct(p)
                            }}
                            fullWidth={true}
                          >
                            Remove
                          </KlevuButton>
                        ) : (
                          <KlevuButton
                            onClick={() => {
                              cart.add(p)
                            }}
                            fullWidth={true}
                          >
                            Add to cart
                          </KlevuButton>
                        )}
                      </div>
                    </KlevuProduct>
                  ))}
                </div>
              </div>

              {/* <KlevuSort
          onKlevuSortChanged={(e) => {
            setOffset(0)
            setSort(e.detail)
          }}
        /> */}
            </div>
            {queryResult ? (
              <KlevuPagination
                // onKlevuPaginationChange={onPageChange}
                queryResult={queryResult}
              />
            ) : null}
          </>
        ) : (
          <KlevuLoadingIndicator />
        )}
      </div>
      {removeProduct && (
        <KlevuModal startOpen onKlevuCloseModal={() => setRemoveProduct(null)}>
          <p>
            Are you sure you want to remove <b>{removeProduct.name}</b>?
          </p>
          <div style={{ textAlign: "right" }}>
            <KlevuButton
              onClick={() => {
                cart.remove(removeProduct.id)
                setRemoveProduct(null)
              }}
            >
              Remove
            </KlevuButton>
          </div>
        </KlevuModal>
      )}
    </div>
  )
}

export default HomePage
