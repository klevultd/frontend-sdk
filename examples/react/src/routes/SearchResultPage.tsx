import {
  KlevuSearchSorting,
  listFilters,
  applyFilterWithManager,
  KlevuFetch,
  KlevuDomEvents,
  KlevuListenDomEvent,
  FilterManager,
  search,
  sendSearchEvent,
  personalisation,
} from "@klevu/core"
import type {
  KlevuRecord,
  KlevuResponseQueryObject,
  FilterManagerFilters,
} from "@klevu/core"
import {
  IconButton,
  Divider,
  Box,
  Select,
  MenuItem,
  Grid,
  Button,
  Container,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import React, { useState, useCallback, useEffect, useRef } from "react"
import { Product } from "../components/product"
import { FilterAlt } from "@mui/icons-material"
import { FilterDrawer } from "../components/filterdrawer"
import { useSnackbar } from "notistack"
import { useGlobalVariables } from "../globalVariablesContext"

const manager = new FilterManager()

function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

type Props = {
  personlisationEnabled?: boolean
}

export function SearchResultPage(props: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const query = useQuery()
  const location = useLocation()

  const [open, setOpen] = useState(false)
  const [searchResponse, setSearchResponse] = useState<
    KlevuResponseQueryObject | undefined
  >(undefined)
  const [filters, setFilters] = useState<FilterManagerFilters[]>([])
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [sorting, setSorting] = useState(KlevuSearchSorting.Relevance)
  const [showMore, setShowMore] = useState(false)
  const searchId = useRef("")
  const { debugMode } = useGlobalVariables()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const initialFetch = useCallback(async () => {
    const modifiers = [
      listFilters({
        include: ["color", "", "size", "designer"],
        rangeFilterSettings: [
          {
            key: "klevu_price",
            minMax: true,
          },
        ],
        filterManager: manager,
      }),
      applyFilterWithManager(manager),
      sendSearchEvent(),
    ]

    if (props.personlisationEnabled) {
      modifiers.push(personalisation())
    }
    searchId.current = "search" + new Date().getTime()
    const functions = [
      search(
        query.get("q"),
        {
          id: searchId.current,
          limit: 36,
          sort: sorting,
          mode: "demo",
          searchPrefs: debugMode ? ["debugQuery"] : undefined,
        },
        ...modifiers
      ),
    ]
    const res = await KlevuFetch(...functions)

    const searchResult = res.queriesById(searchId.current)
    if (!searchResult) {
      return
    }

    setSearchResponse(searchResult)
    setShowMore(searchResult.hasNextPage())
    setFilters(manager.filters)
    setProducts(searchResult.records ?? [])
  }, [sorting, query])

  const fetchMore = async () => {
    const nextResponse = await searchResponse.getPage({
      filterManager: manager,
    })

    const nextSearchResult = nextResponse.queriesById(searchId.current)

    setProducts([...products, ...(nextSearchResult?.records ?? [])])
    setSearchResponse(nextSearchResult)

    setShowMore(nextSearchResult.hasNextPage())
  }

  const handleFilterUpdate = () => {
    setFilters(manager.filters)
    initialFetch()
  }

  React.useEffect(() => {
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.FilterSelectionUpdate,
      handleFilterUpdate
    )

    // cleanup this component
    return () => {
      stop()
    }
  }, [location.pathname, query, sorting])

  useEffect(() => {
    initialFetch()
  }, [sorting, query, location.pathname])

  return (
    <Container maxWidth="lg">
      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        manager={manager}
        filters={filters}
      />
      <div id="main">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            bgcolor: "background.paper",
            color: "text.secondary",
          }}
        >
          <IconButton
            onClick={handleDrawerOpen}
            size="small"
            style={{ margin: "12px" }}
          >
            <FilterAlt />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <Select
            size="small"
            value={sorting}
            style={{ margin: "12px" }}
            onChange={(event) =>
              setSorting(event.target.value as KlevuSearchSorting)
            }
          >
            <MenuItem value={KlevuSearchSorting.Relevance}>Relevance</MenuItem>
            <MenuItem value={KlevuSearchSorting.PriceAsc}>
              Price: Low to high
            </MenuItem>
            <MenuItem value={KlevuSearchSorting.PriceDesc}>
              Price: Hight to low
            </MenuItem>
          </Select>
        </Box>
        <Grid
          container
          spacing={2}
          style={{
            margin: "24px",
          }}
        >
          {products.map((p, i) => (
            <Grid item key={i}>
              <Product
                product={p}
                onClick={(event) => {
                  navigate(
                    p.itemGroupId
                      ? `/products/${p.itemGroupId}/${p.id}`
                      : `/products/${p.id}`
                  )
                  searchResponse.searchClickEvent?.({
                    productId: p.id,
                    variantId: p.variantId || p.id,
                  })
                  event.preventDefault()
                  return false
                }}
                onAddToCart={(product) => {
                  enqueueSnackbar(`Added ${product.name} to shopping cart`, {
                    variant: "success",
                  })
                }}
              />
            </Grid>
          ))}
        </Grid>
        {showMore ? (
          <Button variant="contained" onClick={() => fetchMore()}>
            Load more
          </Button>
        ) : null}
      </div>
    </Container>
  )
}
