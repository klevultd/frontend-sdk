import {
  FilterManager,
  KlevuDomEvents,
  KlevuListenDomEvent,
  KlevuQueryResult,
  KlevuSearchSorting,
} from "@klevu/core"
import {
  KlevuButton,
  KlevuDrawer,
  KlevuFacetList,
  KlevuPagination,
  KlevuPopup,
  KlevuProduct,
  KlevuProductGrid,
  KlevuQuery,
  KlevuSort,
} from "@klevu/ui-react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { nav } from "../app"
import { useCart } from "../cartContext"

const manager = new FilterManager()

export function CustomCategoryPage() {
  const params = useParams()
  const cart = useCart()
  const navItem = nav.find((n) => n.key === params.id)

  const [queryResult, setQueryResult] = useState<KlevuQueryResult>(null)
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState(KlevuSearchSorting.NameAsc)
  const limit = 24
  const onPageChange = (event: CustomEvent<number>) => {
    setOffset((event.detail - 1) * limit)
  }

  useEffect(() => {
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.FilterSelectionUpdate,
      () => {
        setOffset(0)
      }
    )
    return () => {
      stop()
    }
  }, [])

  return (
    <div className="customcategorypage">
      <KlevuQuery
        type="merchandising"
        category={params.id}
        categoryTitle={navItem.label}
        manager={manager}
        limit={limit}
        offset={offset}
        sort={sort}
        onKlevuQueryResult={(event) => {
          setQueryResult(event.detail.result)
        }}
        updateOnFilterChange
      />
      <KlevuFacetList manager={manager} />
      <div className="gridcontent">
        <KlevuProductGrid>
          {queryResult?.records.map((p) => (
            <KlevuProduct product={p} key={p.id} fixedWidth variant="small">
              <div slot="bottom">
                <KlevuButton
                  onClick={() => {
                    cart.add(p)
                  }}
                >
                  Add to cart
                </KlevuButton>
              </div>
            </KlevuProduct>
          ))}
        </KlevuProductGrid>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <KlevuPopup openAtFocus anchor="top" closeAtOutsideClick>
            <KlevuButton slot="origin">Open pagination popup</KlevuButton>
            <div slot="content" className="gridcontentbottom">
              {queryResult ? (
                <KlevuPagination
                  onKlevuPaginationChange={onPageChange}
                  queryResult={queryResult}
                />
              ) : null}
              <KlevuSort
                onKlevuSortChanged={(e) => {
                  setOffset(0)
                  setSort(e.detail)
                }}
              />
            </div>
          </KlevuPopup>
        </div>
      </div>
    </div>
  )
}
