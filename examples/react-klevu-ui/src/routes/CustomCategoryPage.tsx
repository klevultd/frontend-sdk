import {
  FilterManager,
  KlevuQueryResult,
  KlevuRecord,
  KlevuSearchSorting,
} from "@klevu/core"
import {
  KlevuButton,
  KlevuFacetList,
  KlevuPagination,
  KlevuProduct,
  KlevuProductGrid,
  KlevuQuery,
  KlevuSort,
} from "@klevu/ui-react"
import React, { useState } from "react"
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
        <KlevuSort
          onKlevuSortChanged={(e) => {
            setSort(e.detail)
          }}
        />
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
        {queryResult ? (
          <KlevuPagination
            onKlevuPaginationChange={onPageChange}
            queryResult={queryResult}
          />
        ) : null}
      </div>
    </div>
  )
}
