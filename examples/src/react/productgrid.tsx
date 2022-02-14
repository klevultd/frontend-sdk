import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  Select,
  MenuItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import React, { useCallback, useEffect, useState } from "react"
import FilterIcon from "@mui/icons-material/FilterAlt"
import {
  FilterManager,
  isFilterResultOptions,
  isFilterResultSlider,
  KlevuDomEvents,
  KlevuFetch,
  KlevuSorting,
  listFilters,
  trendingSearchProducts,
} from "@klevu/core"
import type {
  KlevuRecord,
  FilterResultOptions,
  FilterResultSlider,
} from "@klevu/core"
import { Product } from "./product"

const drawerWidth = 240

const manager = new FilterManager()

export function ProductGrid() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<FilterResultOptions[]>(manager.options)
  const [sliders, setSliders] = useState<FilterResultSlider[]>(manager.sliders)
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [sorting, setSorting] = useState(KlevuSorting.Relevance)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const fetch = useCallback(async () => {
    const res = await KlevuFetch(
      listFilters({
        targetIds: ["search"],
        rangeFilterSettings: [
          {
            key: "klevu_price",
            minMax: true,
          },
        ],
        manager: manager,
      }),
      trendingSearchProducts({
        id: "search",
        limit: 36,
      })
    )
    setOptions(manager.options)
    setSliders(manager.sliders)
    setProducts(res.queriesById("search")?.records ?? [])
  }, [])

  const handleFilterUpdate = () => {
    setOptions([...manager.options])
    setSliders([...manager.sliders])
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
    fetch()
  }, [])

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
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        {manager.options.map((o, i) => (
          <React.Fragment>
            <Typography variant="h5">{o.label}</Typography>
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
            onChange={(event) => setSorting(event.target.value as KlevuSorting)}
          >
            <MenuItem value={KlevuSorting.Relevance}>Relevance</MenuItem>
            <MenuItem value={KlevuSorting.PriceAsc}>
              Price: Low to high
            </MenuItem>
            <MenuItem value={KlevuSorting.PriceDesc}>
              Price: Hight to low
            </MenuItem>
          </Select>
        </Box>
        <Grid container spacing={2}>
          {products.map((p, i) => (
            <Grid item key={i}>
              <Product
                product={p}
                onClick={() => alert("Should show product page")}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </React.Fragment>
  )
}
