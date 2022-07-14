import {
  KlevuSearchSorting,
  listFilters,
  applyFilterWithManager,
  KlevuFetch,
  KlevuDomEvents,
  KlevuListenDomEvent,
  FilterManager,
  search,
  KlevuResultEvent,
  sendSearchEvent,
  personalisation,
  KlevuNextFunc,
} from "@klevu/core"
import type {
  KlevuRecord,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
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
import React, { useState, useCallback, useEffect } from "react"
import { Product } from "../components/product"
import { FilterAlt } from "@mui/icons-material"
import { FilterDrawer } from "../components/filterdrawer"
import { useSnackbar } from "notistack"

const manager = new FilterManager()
let nextFunc: KlevuNextFunc
let clickManager: ReturnType<KlevuResultEvent["getSearchClickSendEvent"]>

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
  const [options, setOptions] = useState<KlevuFilterResultOptions[]>(
    manager.options
  )
  const [sliders, setSliders] = useState<KlevuFilterResultSlider[]>(
    manager.sliders
  )
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [sorting, setSorting] = useState(KlevuSearchSorting.Relevance)
  const [showMore, setShowMore] = useState(false)

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

    const functions = [
      search(
        query.get("q"),
        {
          id: "search",
          limit: 36,
          sort: sorting,
        },
        ...modifiers
      ),
    ]
    const res = await KlevuFetch(...functions)

    const searchResult = res.queriesById("search")
    if (!searchResult) {
      return
    }

    nextFunc = searchResult.next

    clickManager = searchResult.getSearchClickSendEvent()

    setShowMore(Boolean(searchResult.next))
    setOptions(manager.options)
    setSliders(manager.sliders)
    setProducts(searchResult.records ?? [])
  }, [sorting, query])

  const fetchMore = async () => {
    const nextRes = await nextFunc({
      filterManager: manager,
    })

    const searchResult = nextRes.queriesById("search")

    setProducts([...products, ...(searchResult?.records ?? [])])
    nextFunc = searchResult.next
    setShowMore(Boolean(searchResult.next))
  }

  const handleFilterUpdate = () => {
    setOptions(manager.options)
    setSliders(manager.sliders)
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
        options={options}
        sliders={sliders}
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
                  navigate(`/products/${p.itemGroupId}/${p.id}`)
                  clickManager(p.id, p.itemGroupId)
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
