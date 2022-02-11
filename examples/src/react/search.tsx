import {
  KlevuFetch,
  KlevuTypeOfRecord,
  listFilters,
  search,
  suggestions,
  trendingSearchProducts,
} from "@klevu/core"
import type { KlevuRecord } from "@klevu/core"
import { IconButton, Paper, Popper, TextField, Typography } from "@mui/material"
import debounce from "lodash.debounce"
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks"
import React, { useEffect, useMemo, useState } from "react"
import { Product } from "./product"
import { Close } from "@mui/icons-material"

export function Search() {
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [trendingProducts, setTrendingProducts] = useState<KlevuRecord[]>([])
  const [sugs, setSuggestions] = useState<string[]>([])
  const popupState = usePopupState({
    variant: "popper",
    popupId: "searchPopup",
  })

  const changeHandler = async (event: any) => {
    console.log(event.target.value)
    if (event.target.length < 3) {
      setProducts([])
      setSuggestions([])
      return
    }

    const result = await KlevuFetch(
      listFilters(["category"]),
      search(event.target.value, {
        typeOfRecords: [KlevuTypeOfRecord.Product],
      }),
      suggestions(event.target.value)
    )

    setProducts(result.queriesById("search")?.records ?? [])
    setSuggestions(
      result
        .suggestionsById("suggestions")
        ?.suggestions.map((i) => i.suggest) ?? []
    )
  }

  const fetchEmptySuggestions = async () => {
    popupState.open()

    if (trendingProducts.length > 0) {
      return
    }

    const res = await KlevuFetch(
      trendingSearchProducts({
        limit: 10,
      })
    )
    setTrendingProducts(
      res.queriesById("trendingSearchProducts")?.records ?? []
    )
  }

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [])

  return (
    <React.Fragment>
      <TextField
        style={{
          color: "#fff",
        }}
        variant="filled"
        size="small"
        onChange={debouncedChangeHandler}
        onFocus={fetchEmptySuggestions}
        placeholder="Search for products"
        {...bindTrigger(popupState)}
      />
      <Popper
        {...bindMenu(popupState)}
        popperOptions={{
          placement: "bottom-end",
        }}
      >
        <Paper
          elevation={8}
          style={{
            padding: "12px",
            width: "650px",
            display: "flex",
            position: "relative",
          }}
        >
          <IconButton
            style={{ position: "absolute", top: "6px", right: "6px" }}
            onClick={() => {
              popupState.close()
            }}
          >
            <Close />
          </IconButton>
          <div style={{ width: "160px", flexShrink: 0 }}>
            <ul style={{ margin: 0, listStyleType: "none" }}>
              {sugs.map((s) => (
                <li
                  style={{ padding: 0 }}
                  dangerouslySetInnerHTML={{ __html: s }}
                ></li>
              ))}
            </ul>
          </div>
          <div style={{ width: "100%" }}>
            {products.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Search results</Typography>
                <div className="horizontalproducts">
                  <div className="horizontalproducts_inner">
                    {products.map((p) => (
                      <Product product={p} />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ) : trendingProducts.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Trending products</Typography>
                <div className="horizontalproducts">
                  <div className="horizontalproducts_inner">
                    {trendingProducts.map((p) => (
                      <Product product={p} />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </Paper>
      </Popper>
    </React.Fragment>
  )
}
