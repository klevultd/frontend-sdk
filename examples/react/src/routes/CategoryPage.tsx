import {
  KlevuSearchSorting,
  listFilters,
  applyFilterWithManager,
  KlevuFetch,
  KlevuDomEvents,
  FilterManager,
  categoryMerchandising,
  sendMerchandisingViewEvent,
} from "@klevu/core"
import type {
  KlevuRecord,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuFetchResponse,
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
} from "@mui/material"
import { useParams } from "react-router-dom"
import React, { useState, useCallback, useEffect } from "react"
import { Product } from "../components/product"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import FilterIcon from "@mui/icons-material/FilterAlt"

const drawerWidth = 240
const manager = new FilterManager()
let prevRes: KlevuFetchResponse

export function CategoryPage() {
  const params = useParams()
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

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const initialFetch = useCallback(async () => {
    const functions = [
      categoryMerchandising(
        params.id,
        {
          id: "search",
          limit: 36,
          sort: sorting,
        },
        listFilters({
          rangeFilterSettings: [
            {
              key: "klevu_price",
              minMax: true,
            },
          ],
          filterManager: manager,
        }),
        applyFilterWithManager(manager),
        sendMerchandisingViewEvent(params.id, params.id)
      ),
    ]
    const res = await KlevuFetch(...functions)
    prevRes = res

    const searchResult = res.queriesById("search")
    if (!searchResult) {
      return
    }

    setShowMore(Boolean(res.next))
    setOptions(manager.options)
    setSliders(manager.sliders)
    setProducts(searchResult.records ?? [])
  }, [sorting, params.id])

  const fetchMore = async () => {
    const nextRes = await prevRes.next({
      filterManager: manager,
    })
    setProducts([
      ...products,
      ...(nextRes.queriesById("search")?.records ?? []),
    ])
    prevRes = nextRes
    setShowMore(Boolean(nextRes.next))
  }

  const handleFilterUpdate = () => {
    setOptions(manager.options)
    setSliders(manager.sliders)
    initialFetch()
  }

  React.useEffect(() => {
    document.addEventListener(
      KlevuDomEvents.FilterSelectionUpdate,
      handleFilterUpdate
    )

    // cleanup this component
    return () => {
      document.removeEventListener(
        KlevuDomEvents.FilterSelectionUpdate,
        handleFilterUpdate
      )
    }
  }, [])

  useEffect(() => {
    initialFetch()
  }, [sorting, params.id])

  return (
    <React.Fragment>
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
          <ChevronLeftIcon />
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
              />
            </div>
          </React.Fragment>
        ))}
      </Drawer>
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
            <FilterIcon />
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
              <Product product={p} />
            </Grid>
          ))}
        </Grid>
        {showMore ? (
          <Button variant="contained" onClick={() => fetchMore()}>
            Load more
          </Button>
        ) : null}
      </div>
    </React.Fragment>
  )
}
