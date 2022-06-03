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
  Container,
} from "@mui/material"
import { useLocation } from "react-router-dom"
import React, { useState, useCallback, useEffect, useRef } from "react"
import { Product } from "../components/product"
import { ChevronLeft, FilterAlt } from "@mui/icons-material"
import debounce from "lodash.debounce"

const drawerWidth = 240
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
  const manager = useRef(new FilterManager())
  const query = useQuery()
  const location = useLocation()

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<KlevuFilterResultOptions[]>(
    manager.current.options
  )
  const [sliders, setSliders] = useState<KlevuFilterResultSlider[]>(
    manager.current.sliders
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
    const modifiers = [
      listFilters({
        include: ["color", "", "size", "designer"],
        rangeFilterSettings: [
          {
            key: "klevu_price",
            minMax: true,
          },
        ],
        filterManager: manager.current,
      }),
      applyFilterWithManager(manager.current),
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
    setOptions(manager.current.options)
    setSliders(manager.current.sliders)
    setProducts(searchResult.records ?? [])
  }, [sorting, query])

  const fetchMore = async () => {
    const nextRes = await nextFunc({
      filterManager: manager.current,
    })

    const searchResult = nextRes.queriesById("search")

    setProducts([...products, ...(searchResult?.records ?? [])])
    nextFunc = searchResult.next
    setShowMore(Boolean(searchResult.next))
  }

  const deboucnedSlider = (key) =>
    debounce((event, value) => {
      manager.current.updateSlide(key, value[0], value[1])
    }, 300)

  const handleFilterUpdate = () => {
    setOptions(manager.current.options)
    setSliders(manager.current.sliders)
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
  }, [location.pathname])

  useEffect(() => {
    initialFetch()
  }, [sorting, query, location.pathname])

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
                    manager.current.toggleOption(o.key, o2.name)
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
                onChange={deboucnedSlider(s.key)}
                valueLabelDisplay="on"
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
                onClick={() => {
                  clickManager(p.id, p.itemGroupId)
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
