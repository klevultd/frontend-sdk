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
} from "@mui/material"
import React from "react"
import debounce from "lodash.debounce"
import {
  FilterManager,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
} from "@klevu/core"

const drawerWidth = 240

export function FilterDrawer(props: {
  open: boolean
  options: KlevuFilterResultOptions[]
  sliders: KlevuFilterResultSlider[]
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
      {props.options.map((o, i) => (
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
                  props.manager.toggleOption(o.key, o2.name)
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
      {props.sliders.map((s, i) => (
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
  )
}
