import {
  KlevuRecord,
  KlevuResponseQueryObject,
  FilterManagerFilters,
  KMCRecommendationLogic,
  personalisation,
} from "@klevu/core"
import {
  abTest,
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuListenDomEvent,
  KlevuSearchSorting,
  kmcRecommendation,
  listFilters,
  sendMerchandisingViewEvent,
  sendRecommendationViewEvent,
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
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Product } from "./product"

import { useSnackbar } from "notistack"
import { links, pages } from "./appbar"
import { FilterDrawer } from "./filterdrawer"
import { RecommendationBanner } from "./recommendationBanner"
import { config } from "../config"
import { useGlobalVariables } from "../globalVariablesContext"

const manager = new FilterManager()

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export function Category({ type = "" }: { type?: "" | "personalisation" }) {
  let query = useQuery()
  const params = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterManagerFilters[]>([])
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [recommendationProducts, setRecommendationProducts] = useState<
    KlevuRecord[]
  >([])
  const searchId = useRef("")
  const [sorting, setSorting] = useState(KlevuSearchSorting.Relevance)
  const [showMore, setShowMore] = useState(false)
  const [itemsOnPage, setItemsOnPage] = useState(36)
  const [searchResponse, setSearchResponse] = useState<
    KlevuResponseQueryObject | undefined
  >(undefined)
  const [recommendationResponse, setRecommendationResponse] = useState<
    KlevuResponseQueryObject | undefined
  >(undefined)
  const { debugMode } = useGlobalVariables()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const searchModifiers = type === "personalisation" ? [personalisation()] : []

  const initialFetch = useCallback(async () => {
    searchId.current = "search" + new Date().getTime()
    const recommendationId = "recommendation" + new Date().getTime()
    let recsPayload

    try {
      if (config.categoryPageRecommendationId) {
        recsPayload = await kmcRecommendation(
          config.categoryPageRecommendationId,
          {
            categoryPath: params.id,
            id: recommendationId,
            mode: "demo",
            searchPrefs: debugMode ? ["debugQuery"] : undefined,
            // personalisation: getPersonalizationPayloadIfApplicable(),
          },
          sendRecommendationViewEvent({
            logic: KMCRecommendationLogic.Similar,
            recsKey: "category-product-recs-demo",
            title: "Category product recommendations",
          }),
          ...searchModifiers
        )
      }
    } catch (e) {
      console.error("Failed to get recs data", e)
    }
    const res = await KlevuFetch(
      categoryMerchandising(
        params.id,
        {
          id: searchId.current,
          limit: itemsOnPage,
          sort: sorting,
          campaignForCatNav: query.get("campaignId"),
          mode: "demo",
          searchPrefs: debugMode ? ["debugQuery"] : undefined,
          ...searchModifiers,
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
        ...searchModifiers
      ),
      recsPayload || {}
    )

    const searchResult = res.queriesById(searchId.current)

    if (!searchResult) {
      return
    }

    if (recsPayload?.queries?.length > 0) {
      const recommendationResult = res.queriesById(recommendationId)
      setRecommendationResponse(recommendationResult)
      setRecommendationProducts(recommendationResult?.records ?? [])
    }

    setSearchResponse(searchResult)

    setShowMore(searchResult.hasNextPage())
    setFilters(manager.filters)
    setProducts(searchResult.records ?? [])
  }, [sorting, params.id, itemsOnPage])

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
    <>
      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        manager={manager}
        filters={filters}
      />
      {recommendationProducts.length > 0 && (
        <RecommendationBanner
          products={recommendationProducts}
          title="Category product recommendations"
          productClick={(productId, variantId, product, index) => {
            recommendationResponse.recommendationClickEvent?.({
              productId,
              variantId,
            })
          }}
        />
      )}

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
                debugModeShowOnly={["score", "klevu_selflearning_boosting"]}
                onClick={(event) => {
                  searchResponse.categoryMerchandisingClickEvent?.({
                    productId: p.id,
                    variantId: p.variantId || p.id,
                    categoryTitle: title,
                  })
                  navigate(
                    p.itemGroupId
                      ? `/products/${p.itemGroupId}/${p.id}`
                      : `/products/${p.id}`
                  )
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
    </>
  )
}
