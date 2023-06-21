import { ChevronLeft } from "@mui/icons-material"
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
  Button,
} from "@mui/material"
import React from "react"
import debounce from "lodash.debounce"
import { FilterManager, FilterManagerFilters } from "@klevu/core"

const drawerWidth = 240

export function FilterDrawer(props: {
  open: boolean
  filters: FilterManagerFilters[]
  manager: FilterManager
  onClose: () => void
}) {
  const handleDrawerClose = () => {
    props.onClose()
  }

  const debouncedSlider = (key) =>
    debounce((event, value) => {
      props.manager.updateSlide(key, value[0], value[1])
    }, 300)

  return (
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
      open={props.open}
      onClose={handleDrawerClose}
    >
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeft />
      </IconButton>
      <Divider />
      <Button onClick={() => props.manager.clearOptionSelections()}>
        Clear selections
      </Button>
      <Divider />
      {props.filters.map((filter, i) => {
        if (FilterManager.isKlevuFilterResultOptions(filter)) {
          return (
            <React.Fragment key={i}>
              <Typography
                variant="h6"
                style={{
                  margin: "0 12px",
                }}
              >
                {filter.label}
              </Typography>
              <List key={i}>
                {filter.options.map((o2, i2) => (
                  <ListItemButton
                    key={i2}
                    role={undefined}
                    onClick={() => {
                      props.manager.toggleOption(filter.key, o2.name)
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
                    {filter.key === "color" ? (
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
          )
        } else if (FilterManager.isKlevuFilterResultSlider(filter)) {
          return (
            <React.Fragment key={i}>
              <Typography variant="h6" style={{ margin: "0 12px" }}>
                {filter.label}
              </Typography>
              <div style={{ margin: "24px" }}>
                <Slider
                  defaultValue={[
                    parseInt(filter.start || filter.min),
                    parseInt(filter.end || filter.max),
                  ]}
                  max={parseInt(filter.max)}
                  min={parseInt(filter.min)}
                  onChange={debouncedSlider(filter.key)}
                  valueLabelDisplay="on"
                />
              </div>
            </React.Fragment>
          )
        }
      })}
    </Drawer>
  )
}
