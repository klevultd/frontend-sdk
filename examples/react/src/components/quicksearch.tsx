import {
  KlevuDomEvents,
  KlevuFetch,
  KlevuKMCSettings,
  KlevuLastSearches,
  KlevuResultEvent,
  KlevuTypeOfRecord,
  personalisation,
  search,
  suggestions,
  trendingProducts,
} from "@klevu/core"
import type { KlevuRecord, KlevuLastSearch, KMCRootObject } from "@klevu/core"
import {
  Grid,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material"
import debounce from "lodash.debounce"
import {
  bindPopper,
  bindFocus,
  usePopupState,
} from "material-ui-popup-state/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useMemo, useState } from "react"
import { Product } from "./product"
import SearchIcon from "@mui/icons-material/Search"
import { LoadingIndicator } from "./loadingIndicator"

let clickManager: ReturnType<KlevuResultEvent["getSearchClickSendEvent"]>

type Props = {
  label: string
  enablePersonalisation?: boolean
}

export function QuickSearch(props: Props) {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState("")
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [trendProducts, setTrendingProducts] = useState<KlevuRecord[]>([])
  const [lastSearches, setLastSearches] = useState<KlevuLastSearch[]>(
    KlevuLastSearches.get()
  )
  const [sugs, setSuggestions] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const popupState = usePopupState({
    variant: "popper",
    popupId: "searchPopup",
    disableAutoFocus: true,
  })

  const [kmcSettings, setKmcSettings] = useState<KMCRootObject>()

  let location = useLocation()
  React.useEffect(() => {
    popupState.close()
    setProducts([])
  }, [location])

  const searchModifiers = props.enablePersonalisation ? [personalisation()] : []

  const doSearch = async (term: string) => {
    if (term.length < 3) {
      setProducts([])
      setSuggestions([])
      return
    }

    const result = await KlevuFetch(
      search(
        term,
        {
          limit: 6,
          typeOfRecords: [KlevuTypeOfRecord.Product],
        },
        ...searchModifiers
      ),
      search(term, {
        id: "categories",
        limit: 5,
        typeOfRecords: [KlevuTypeOfRecord.Category],
        groupBy: "name",
      }),
      suggestions(term)
    )

    const searchResult = result.queriesById("search")
    clickManager = searchResult.getSearchClickSendEvent()

    setProducts(searchResult?.records ?? [])
    setSuggestions(
      result
        .suggestionsById("suggestions")
        ?.suggestions.map((i) => i.suggest) ?? []
    )
    setCategories(
      result.queriesById("categories")?.records.map((r) => r.name) ?? []
    )
  }

  const fetchEmptySuggestions = async () => {
    handleLastSearchesUpdate()

    const res = await KlevuFetch(
      trendingProducts(
        {
          limit: 3,
        },
        ...searchModifiers
      )
    )
    setTrendingProducts(res.queriesById("trendingProducts")?.records ?? [])
  }

  const onKeydown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      const url = props.enablePersonalisation
        ? "/search?q="
        : "/searchnopersonalisation?q="
      navigate(url + encodeURIComponent(searchValue))
      popupState.close()
    }
  }

  const onSearchChange = (event) => {
    setSearchValue(event.target.value)
    debouncedChangeHandler(event.target.value)
  }

  const debouncedChangeHandler: any = useMemo(() => debounce(doSearch, 300), [])

  const fetchKMCSettings = async () => {
    const settings = await KlevuKMCSettings()
    setKmcSettings(settings.root)
  }

  useEffect(() => {
    fetchKMCSettings()
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [])

  const handleLastSearchesUpdate = () => {
    setLastSearches(Array.from(KlevuLastSearches.get()).reverse())
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

  const focusParams = bindFocus(popupState)
  const params = {
    ...focusParams,
    onFocus: (event) => {
      focusParams.onFocus(event)
      fetchEmptySuggestions()
    },
  }

  return (
    <React.Fragment>
      <TextField
        style={{
          color: "#fff",
        }}
        label={props.label}
        value={searchValue}
        variant="filled"
        size="small"
        onKeyDown={onKeydown}
        onChange={onSearchChange}
        onFocus={fetchEmptySuggestions}
        placeholder="Search for products"
        inputProps={{
          autoComplete: "off",
          form: {
            autocomplete: "off",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        {...params}
      />
      <Popper
        {...bindPopper(popupState)}
        popperOptions={{
          placement: "bottom-end",
        }}
        style={{
          zIndex: 10,
        }}
      >
        <Paper
          elevation={8}
          style={{
            padding: "12px",
            width: "792px",
            display: "flex",
            position: "relative",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              width: "160px",
              flexShrink: 0,
              borderRight: "1px solid #d1d1d1",
              paddingRight: "8px",
              marginRight: "8px",
            }}
          >
            {sugs.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Suggestions</Typography>
                <ul
                  style={{ margin: 0, listStyleType: "none", padding: "12px" }}
                >
                  {sugs.map((s, i) => (
                    <li
                      key={i}
                      style={{ padding: 0 }}
                      dangerouslySetInnerHTML={{ __html: s }}
                    ></li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {kmcSettings &&
                  kmcSettings.klevu_webstorePopularTerms.length > 0 && (
                    <React.Fragment>
                      <Typography variant="h6">Popular searches</Typography>
                      <ul
                        style={{
                          margin: 0,
                          listStyleType: "none",
                          padding: "12px",
                        }}
                      >
                        {kmcSettings.klevu_webstorePopularTerms.map((s, i) => (
                          <li key={i} style={{ padding: 0 }}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
                  )}
              </React.Fragment>
            )}
            {lastSearches.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Last searches</Typography>
                <ul
                  style={{ margin: 0, listStyleType: "none", padding: "12px" }}
                >
                  {lastSearches.map((s, i) => (
                    <li key={i} style={{ padding: 0 }}>
                      {s.term}
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : null}
            {categories.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Found categories</Typography>
                <ul
                  style={{ margin: 0, listStyleType: "none", padding: "12px" }}
                >
                  {categories.map((s, i) => (
                    <li key={i} style={{ padding: 0 }}>
                      {s}
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
                        onClick={() => {
                          clickManager(p.id, p.itemGroupId)
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
            ) : (
              <LoadingIndicator />
            )}
          </div>
        </Paper>
      </Popper>
    </React.Fragment>
  )
}
