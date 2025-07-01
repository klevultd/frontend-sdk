import {
  KlevuDomEvents,
  KlevuListenDomEvent,
  KlevuFetch,
  KlevuKMCSettings,
  KlevuLastSearches,
  KlevuResultEvent,
  KlevuTypeOfRecord,
  personalisation,
  search,
  suggestions,
  trendingProducts,
  sendSearchEvent,
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
import React, { useEffect, useMemo, useState } from "react"
import { Product } from "./product"
import SearchIcon from "@mui/icons-material/Search"
import { LoadingIndicator } from "./loadingIndicator"
import { useGlobalVariables } from "../globalVariablesContext"

let clickManager: KlevuResultEvent["searchClickEvent"]

type Props = {
  label: string
  currentUrl: string
  enablePersonalisation?: boolean
  onProductClick?: (product: KlevuRecord) => void
  onSearchClick?: (term: string) => void
}

/**
 * This component has been modified to be used in React and Hydrogen examples.
 * It is a bit more complicated that it needs to be, but it is still a good example of how to use the Klevu core.
 *
 * @param props
 * @returns
 */
export function QuickSearch(props: Props) {
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
  const { debugMode } = useGlobalVariables()

  React.useEffect(() => {
    popupState.close()
    setProducts([])
  }, [props.currentUrl])

  const searchModifiers = props.enablePersonalisation ? [personalisation()] : []

  const doSearch = async (term: string) => {
    if (term.length < 3) {
      setProducts([])
      setSuggestions([])
      return
    }

    const searchId = "search" + new Date().getTime()
    const suggestionsId = "suggestions" + new Date().getTime()
    const categoriesId = "categoriesId" + new Date().getTime()

    const result = await KlevuFetch(
      search(
        term,
        {
          limit: 6,
          typeOfRecords: [KlevuTypeOfRecord.Product],
          id: searchId,
          mode: "demo",
          searchPrefs: debugMode ? ["debugQuery"] : undefined,
        },
        ...[...searchModifiers, sendSearchEvent()]
      ),
      search(term, {
        id: categoriesId,
        limit: 5,
        typeOfRecords: [KlevuTypeOfRecord.Category],
        groupBy: "name",
        mode: "demo",
        searchPrefs: debugMode ? ["debugQuery"] : undefined,
      }),
      suggestions(term, {
        id: suggestionsId,
        mode: "demo",
        searchPrefs: debugMode ? ["debugQuery"] : undefined,
      })
    )

    const searchResult = result.queriesById(searchId)
    clickManager = searchResult.searchClickEvent.bind(searchResult)

    setProducts(searchResult?.records ?? [])
    setSuggestions(
      result
        .suggestionsById(suggestionsId)
        ?.suggestions.map((i) => i.suggest) ?? []
    )
    setCategories(
      result.queriesById(categoriesId)?.records.map((r) => r.name) ?? []
    )
  }

  const handleOnFocus = () => {
    if (searchValue) {
      debouncedChangeHandler(searchValue)
    } else {
      fetchEmptySuggestions()
    }
  }

  const fetchEmptySuggestions = async () => {
    handleLastSearchesUpdate()
    const trendingId = "trending" + new Date().getTime()
    const res = await KlevuFetch(
      trendingProducts(
        {
          limit: 3,
          id: trendingId,
          mode: "demo",
          searchPrefs: debugMode ? ["debugQuery"] : undefined,
        },
        ...searchModifiers
      )
    )
    setTrendingProducts(res.queriesById(trendingId)?.records ?? [])
  }

  const onKeydown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      const url = props.enablePersonalisation
        ? "/search?q="
        : "/searchnopersonalisation?q="
      //navigate(url + encodeURIComponent(searchValue))
      props.onSearchClick?.(searchValue)
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
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.LastSearchUpdate,
      handleLastSearchesUpdate
    )

    // cleanup this component
    return () => {
      stop()
    }
  }, [])

  const focusParams = bindFocus(popupState)
  const params = {
    ...focusParams,
    onFocus: (event) => {
      focusParams.onFocus(event)
      handleOnFocus()
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
        onFocus={handleOnFocus}
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
            padding: "10px",
            width: "820px",
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
              margin: "10px",
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
                  kmcSettings.klevu_webstorePopularTerms?.length > 0 && (
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
                    <li
                      key={i}
                      style={{ padding: 0 }}
                      dangerouslySetInnerHTML={{ __html: s }}
                    ></li>
                  ))}
                </ul>
              </React.Fragment>
            ) : null}
          </div>
          <div
            style={{
              width: "100%",
              overflow: "auto",
              maxHeight: "90vh",
            }}
          >
            {products.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6">Search results</Typography>
                <Grid container spacing={2}>
                  {products.map((p, i) => (
                    <Grid item key={i}>
                      <Product
                        hideAddToCart
                        product={p}
                        onClick={(event) => {
                          clickManager({ productId: p.id })
                          props.onProductClick?.(p)
                          event.preventDefault()
                          return false
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
                        hideAddToCart
                        product={p}
                        onClick={(event) => {
                          props.onProductClick?.(p)
                          popupState.close()
                          event.preventDefault()
                          return false
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
