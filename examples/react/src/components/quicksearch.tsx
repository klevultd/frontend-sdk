import {
  KlevuDomEvents,
  KlevuFetch,
  KlevuLastSearches,
  KlevuTypeOfRecord,
  search,
  suggestions,
  trendingProducts,
} from "@klevu/core"
import type { KlevuRecord, KlevuLastSearch } from "@klevu/core"
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material"
import debounce from "lodash.debounce"
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useMemo, useState } from "react"
import { Product } from "./product"
import { Close } from "@mui/icons-material"
import SearchIcon from "@mui/icons-material/Search"

export function QuickSearch() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState("")
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [trendProducts, setTrendingProducts] = useState<KlevuRecord[]>([])
  const [lastSearches, setLastSearches] = useState<KlevuLastSearch[]>(
    KlevuLastSearches.get()
  )
  const [sugs, setSuggestions] = useState<string[]>([])
  const popupState = usePopupState({
    variant: "popper",
    popupId: "searchPopup",
  })

  const doSearch = async (term: string) => {
    if (term.length < 3) {
      setProducts([])
      setSuggestions([])
      return
    }

    const result = await KlevuFetch(
      search(term, {
        limit: 9,
        typeOfRecords: [KlevuTypeOfRecord.Product],
      }),
      suggestions(term)
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
    setLastSearches(KlevuLastSearches.get())

    if (trendProducts.length > 0) {
      return
    }

    const res = await KlevuFetch(
      trendingProducts({
        limit: 3,
      })
    )
    setTrendingProducts(res.queriesById("trendingProducts")?.records ?? [])
  }

  const onKeydown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      navigate("/search?q=" + encodeURIComponent(searchValue))
    }
  }

  const onSearchChange = (event) => {
    setSearchValue(event.target.value)
    debouncedChangeHandler(event.target.value)
  }

  const debouncedChangeHandler: any = useMemo(() => debounce(doSearch, 300), [])

  const clickOnSearch = (suggestion: string) => {
    const raw = suggestion.replace(/<[^>]*>?/gm, "")
    setSearchValue(raw)
    doSearch(raw)
  }

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [])

  const handleLastSearchesUpdate = (event) => {
    setLastSearches(KlevuLastSearches.get())
  }

  React.useEffect(() => {
    document.addEventListener(
      KlevuDomEvents.LastSearchUpdate,
      handleLastSearchesUpdate
    )

    // cleanup this component
    return () => {
      document.removeEventListener(
        KlevuDomEvents.LastSearchUpdate,
        handleLastSearchesUpdate
      )
    }
  }, [])

  return (
    <React.Fragment>
      <TextField
        style={{
          color: "#fff",
        }}
        value={searchValue}
        variant="filled"
        size="small"
        onKeyDown={onKeydown}
        onChange={onSearchChange}
        onFocus={fetchEmptySuggestions}
        placeholder="Search for products"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
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
              setSearchValue("")
            }}
          >
            <Close />
          </IconButton>
          <div style={{ width: "160px", flexShrink: 0 }}>
            {sugs.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Suggestions</Typography>
                <ul
                  style={{ margin: 0, listStyleType: "none", padding: "12px" }}
                >
                  {sugs.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => clickOnSearch(s)}
                      style={{ padding: 0, cursor: "pointer" }}
                      dangerouslySetInnerHTML={{ __html: s }}
                    ></li>
                  ))}
                </ul>
              </React.Fragment>
            ) : null}
            {lastSearches.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Last searches</Typography>
                <ul
                  style={{ margin: 0, listStyleType: "none", padding: "12px" }}
                >
                  {lastSearches.map((s, i) => (
                    <li
                      key={i}
                      style={{ padding: 0, cursor: "pointer" }}
                      onClick={() => clickOnSearch(s.term)}
                    >
                      {s.term}
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : null}
          </div>
          <div style={{ width: "100%" }}>
            {products.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Search results</Typography>
                <Grid container spacing={2}>
                  {products.map((p, i) => (
                    <Grid item key={i}>
                      <Product
                        product={p}
                        searchTerm={searchValue}
                        onClick={() => {
                          popupState.close()
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            ) : trendProducts.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Trending products</Typography>
                <Grid container spacing={2}>
                  {trendProducts.map((p, i) => (
                    <Grid item key={i}>
                      <Product
                        product={p}
                        onClick={() => {
                          popupState.close()
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            ) : null}
          </div>
        </Paper>
      </Popper>
    </React.Fragment>
  )
}
