import type {
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuNextFunc,
  KlevuRecord,
  KlevuResultEvent,
} from "@klevu/core"
import {
  abTest,
  applyFilterWithManager,
  categoryMerchandising,
  debug,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuListenDomEvent,
  KlevuSearchSorting,
  kmcRecommendation,
  listFilters,
  sendMerchandisingViewEvent,
  sendRecommendationViewEvent,
  overrideSettings,
} from "@klevu/core"
import { FilterAlt } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Product } from "../components/product"

import { useSnackbar } from "notistack"
import { links, pages } from "../components/appbar"
import { FilterDrawer } from "../components/filterdrawer"
import { RecommendationBanner } from "../components/recommendationBanner"
import { config } from "../config"

const manager = new FilterManager()
let nextFunc: KlevuNextFunc
let productClickManager: ReturnType<
  KlevuResultEvent["getCategoryMerchandisingClickSendEvent"]
>
let recommendationClickManager: ReturnType<
  KlevuResultEvent["getRecommendationClickSendEvent"]
>

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export function CategoryPage() {
  let query = useQuery()
  const params = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<KlevuFilterResultOptions[]>(
    manager.options
  )
  const [sliders, setSliders] = useState<KlevuFilterResultSlider[]>(
    manager.sliders
  )
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [recommendationProducts, setRecommendationProducts] = useState<
    KlevuRecord[]
  >([])
  const [sorting, setSorting] = useState(KlevuSearchSorting.Relevance)
  const [showMore, setShowMore] = useState(false)
  const [itemsOnPage, setItemsOnPage] = useState(36)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const initialFetch = useCallback(async () => {
    const res = await KlevuFetch(
      categoryMerchandising(
        params.id,
        {
          id: "search",
          limit: itemsOnPage,
          sort: sorting,
        },
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
        sendMerchandisingViewEvent(params.id),
        abTest(),
        debug(),
        overrideSettings({
          campaignForCatNav: query.get("campaignId"),
        } as any)
      ),
      kmcRecommendation(
        config.categoryPageRecommendationId,
        {
          categoryPath: params.id,
          id: "recommendation",
        },
        sendRecommendationViewEvent("Category product recommendations")
      )
    )
    const searchResult = res.queriesById("search")
    const recommendationResult = res.queriesById("recommendation")

    if (!searchResult) {
      return
    }

    productClickManager = searchResult.getCategoryMerchandisingClickSendEvent()

    setShowMore(Boolean(searchResult.next))
    nextFunc = searchResult.next
    setOptions(manager.options)
    setSliders(manager.sliders)
    setProducts(searchResult.records ?? [])

    if (recommendationResult) {
      recommendationClickManager =
        recommendationResult.getRecommendationClickSendEvent()

      setRecommendationProducts(recommendationResult.records ?? [])
    }
  }, [sorting, params.id, itemsOnPage])

  const fetchMore = async () => {
    const nextRes = await nextFunc({
      filterManager: manager,
    })

    const nextSearchResult = nextRes.queriesById("search")

    setProducts([...products, ...(nextSearchResult?.records ?? [])])

    setShowMore(Boolean(nextSearchResult?.next))
    nextFunc = nextSearchResult?.next
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
  }, [params.id, sorting, itemsOnPage])

  useEffect(() => {
    initialFetch()
  }, [sorting, itemsOnPage])

  useEffect(() => {
    manager.clear()
    initialFetch()
  }, [params.id])

  const title = pages[links.findIndex((p) => p === params.id)]

  return (
    <Container maxWidth="lg">
      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        manager={manager}
        options={options}
        sliders={sliders}
      />

      <RecommendationBanner
        products={recommendationProducts}
        title="Category product recommendations"
        productClick={recommendationClickManager}
      />

      <div id="main">
        <Typography variant="h4" style={{ margin: "3rem 0" }}>
          Category merchandising for {title}
        </Typography>

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
          <Divider orientation="vertical" flexItem />
          <Select
            size="small"
            value={itemsOnPage}
            style={{ margin: "12px" }}
            onChange={(event) => {
              console.log(event.target.value)
              setItemsOnPage(event.target.value as number)
            }}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={36}>36</MenuItem>
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
                onAddToCart={(product) => {
                  enqueueSnackbar(`Added ${product.name} to shopping cart`, {
                    variant: "success",
                  })
                }}
                product={p}
                onClick={(event) => {
                  navigate(`/products/${p.itemGroupId}/${p.id}`)
                  productClickManager(p.id, params.id)
                  event.preventDefault()
                  return false
                }}
              />
            </Grid>
          ))}
        </Grid>
        {showMore ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={() => fetchMore()}>
              Load more
            </Button>
          </div>
        ) : null}
      </div>
    </Container>
  )
}
