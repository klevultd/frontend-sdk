import {
  KlevuSearchSorting,
  listFilters,
  applyFilterWithManager,
  KlevuFetch,
  KlevuDomEvents,
  FilterManager,
  categoryMerchandising,
  sendMerchandisingViewEvent,
  kmcRecommendation,
  KlevuListenDomEvent,
  sendRecommendationViewEvent,
  abTest,
  debug,
} from "@klevu/core"
import type {
  KlevuRecord,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuResultEvent,
  KlevuNextFunc,
} from "@klevu/core"
import {
  Drawer,
  IconButton,
  Divider,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Slider,
  Box,
  Select,
  MenuItem,
  Grid,
  Button,
  Container,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import React, { useState, useCallback, useEffect } from "react"
import { Product } from "../components/product"
import { ChevronLeft, FilterAlt } from "@mui/icons-material"
import debounce from "lodash.debounce"
import { RecommendationBanner } from "../components/recommendationBanner"
import { links, pages } from "../components/appbar"
import { useSnackbar } from "notistack"

const drawerWidth = 240
const manager = new FilterManager()
let nextFunc: KlevuNextFunc
let productClickManager: ReturnType<
  KlevuResultEvent["getCategoryMerchandisingClickSendEvent"]
>
let recommendationClickManager: ReturnType<
  KlevuResultEvent["getRecommendationClickSendEvent"]
>

export function CategoryPage() {
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

  const handleDrawerClose = () => {
    setOpen(false)
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
        debug()
      ),
      kmcRecommendation(
        "k-c0013603-1783-4293-bf80-7b3002587dcb",
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

  const debouncedSlider = (key) =>
    debounce((event, value) => {
      manager.updateSlide(key, value[0], value[1])
    }, 300)

  const title = pages[links.findIndex((p) => p === params.id)]

  return (
    <Container maxWidth="lg">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
        <Divider />
        {options.map((o, i) => (
          <React.Fragment key={i}>
            <Typography
              variant="h6"
              style={{
                margin: "0 12px",
              }}
            >
              {o.label}
            </Typography>
            <List key={i}>
              {o.options.map((o2, i2) => (
                <ListItemButton
                  key={i2}
                  role={undefined}
                  onClick={() => {
                    manager.toggleOption(o.key, o2.name)
                  }}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={o2.selected == true}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={`${o2.name} (${o2.count})`} />
                  {o.key === "color" ? (
                    <div
                      style={{
                        height: "16px",
                        width: "16px",
                        border: "1px solid gray",
                        backgroundColor: o2.name,
                        marginLeft: "8px",
                      }}
                    ></div>
                  ) : null}
                </ListItemButton>
              ))}
            </List>
          </React.Fragment>
        ))}
        {sliders.map((s, i) => (
          <React.Fragment key={i}>
            <Typography variant="h6" style={{ margin: "0 12px" }}>
              {s.label}
            </Typography>
            <div style={{ margin: "24px" }}>
              <Slider
                defaultValue={[
                  parseInt(s.start || s.min),
                  parseInt(s.end || s.max),
                ]}
                max={parseInt(s.max)}
                min={parseInt(s.min)}
                onChange={debouncedSlider(s.key)}
                valueLabelDisplay="on"
              />
            </div>
          </React.Fragment>
        ))}
      </Drawer>

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
