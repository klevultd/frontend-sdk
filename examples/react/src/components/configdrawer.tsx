import React, { useState, useRef } from "react"
import { ChevronLeft } from "@mui/icons-material"
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  TextField,
  Grid,
  List,
  ListItem,
  Button,
  Divider,
  Snackbar,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import { config, saveConfig, resetConfig } from "../config"
import useCopyToClipboard from "../useCopyToClipboard"
import { useGlobalVariables } from "../globalVariablesContext"
import { getCategoryLabel } from "../utils"
import { cloneDeep } from "lodash"

const stylesDrawer = {
  maxWidth: 700,
  minWidth: 600,
  width: "75%",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    maxWidth: 700,
    minWidth: 600,
    width: "75%",
    boxSizing: "border-box",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  "& .MuiDrawer-paper .MuiDivider-fullWidth": {
    paddingTop: "10px",
  },
  "& .MuiDrawer-paper .MuiTypography-body1": {
    fontSize: "14px",
    fontWeight: "bold",
  },
  "& .MuiDrawer-paper .MuiTypography-body2": {
    fontSize: "12px",
  },
  "& .MuiDrawer-paper .MuiInputBase-input": {
    fontSize: "12px",
    padding: "2.5px 10px",
  },
}

export const ConfigDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [inputConfig, setInputConfig] = useState(config)
  const copy = useCopyToClipboard()
  const [showCopied, setShowCopied] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { topCategories } = useGlobalVariables()

  const onChangeValue = (id, value) => {
    setInputConfig((c) => {
      c[id] = value
      return c
    })
  }
  const onChangeValueNav = (key, value) => {
    const inputConfigCloned = cloneDeep(inputConfig)
    inputConfigCloned.nav[key] = { key: value, label: getCategoryLabel(value) }
    setInputConfig(inputConfigCloned)
  }

  const removeUrlParam = () => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete("demo-config")
    window.location.href =
      window.location.href.split("?")[0] + "?" + searchParams.toString()
  }

  const onSave = () => {
    saveConfig(inputConfig)
    removeUrlParam()
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
  const onReset = () => {
    resetConfig()
    removeUrlParam()
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  const onResetForm = () => {
    const inputBoxes = document.querySelectorAll<HTMLInputElement>(
      '.configurationsDrawer input[type="text"]'
    )
    inputBoxes.forEach((inputBox) => {
      inputBox.value = ""
      if (typeof inputConfig[inputBox.id] === "string") {
        inputConfig[inputBox.id] = ""
      }
    })
    inputConfig.nav = [
      {
        key: "",
        label: "",
      },
      {
        key: "",
        label: "",
      },
      {
        key: "",
        label: "",
      },
    ]
    setInputConfig(inputConfig)
    handleClose()
  }

  const onResetPersonalisation = () => {
    localStorage.removeItem("klevu-last-searches")
    localStorage.removeItem("klevu-last-clicks")
    localStorage.removeItem("klevu-last-clicks-cat")
    localStorage.removeItem("klevu-react-app-show-personalisation")

    setTimeout(() => {
      window.location.reload()
    }, 100)
    handleClose()
  }

  const onCopyUrl = (config) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.append("demo-config", JSON.stringify(config))
    const url =
      window.location.href.split("?")[0] + "?" + searchParams.toString()
    copy(url)
    setShowCopied(true)
    handleClose()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  console.log({ inputConfig, config, topCategories })
  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)}>
        <SettingsIcon />
      </IconButton>

      <Drawer
        sx={stylesDrawer}
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="configurationsDrawer"
      >
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={showCopied}
          autoHideDuration={5000}
          onClose={() => setShowCopied(false)}
          message="Shareable URL copied successfully."
        />
        <Box p={1} textAlign="center" role="configurations">
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={1}>
              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="div">
                Configurations
              </Typography>
            </Grid>
            <Grid item xs={3} alignItems={"end"}>
              <Button
                id="actions"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                size="large"
                variant="outlined"
                color="secondary"
                onClick={handleClick}
              >
                <span>Actions</span>{" "}
                <span style={{ marginLeft: "10px" }}>&#9660;</span>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={onReset}>Reset to Default & Save</MenuItem>
                <MenuItem onClick={onResetForm}>Reset Fields</MenuItem>
                <MenuItem onClick={onResetPersonalisation}>
                  Reset Personalization Data
                </MenuItem>
                <MenuItem onClick={() => onCopyUrl(inputConfig)}>
                  Copy as Url
                </MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={2} alignItems={"end"}>
              <Button
                onClick={onSave}
                variant="outlined"
                color="primary"
                size="large"
                style={{ display: "inline" }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ overflow: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" component="div">
                General
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Search url
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="url"
                type="text"
                defaultValue={config.url
                  .replace("/cs/v2/search", "")
                  .replace("https://", "")}
                onChange={(e) =>
                  onChangeValue(
                    e.target.id,
                    "https://" + e.target.value.trim() + "/cs/v2/search"
                  )
                }
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Api Key
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="apiKey"
                type="text"
                defaultValue={config.apiKey}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Analytics Events V1 URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="eventsApiV1Url"
                type="text"
                defaultValue={config.eventsApiV1Url}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Analytics Events V2 URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="eventsApiV2Url"
                type="text"
                defaultValue={config.eventsApiV2Url}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Recommendations API URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="recommendationsApiUrl"
                type="text"
                defaultValue={config.recommendationsApiUrl}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Visitors Service URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="visitorServiceUrl"
                type="text"
                defaultValue={config.visitorServiceUrl}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                IPV6 Service URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="ipv6ServiceUrl"
                type="text"
                defaultValue={config.ipv6ServiceUrl}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                IPV4 Service URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="ipv4ServiceUrl"
                type="text"
                defaultValue={config.ipv4ServiceUrl}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                MOI Service URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="moiServiceUrl"
                type="text"
                defaultValue={config.moiServiceUrl}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                  style={{ margin: "0 8px", whiteSpace: "nowrap" }}
                  control={
                    <Switch
                      id="isProductAssistantEnabled"
                      color="success"
                      defaultChecked={config.isProductAssistantEnabled}
                      onChange={(e) => {
                        console.log({e: e.target.checked})
                        onChangeValue(e.target.id, e.target.checked)
                      }}
                    />
                  }
                  label="Enable Shopping Assistant"
                />
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" component="div">
                Recommendations
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Recommendation url
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="recommendationsApiUrl"
                type="text"
                defaultValue={config.recommendationsApiUrl
                  .replace("/recommendations/", "")
                  .replace("https://", "")}
                onChange={(e) =>
                  onChangeValue(
                    e.target.id,
                    "https://" + e.target.value.trim() + "/recommendations/"
                  )
                }
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Category Recommendation Id
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="categoryPageRecommendationId"
                type="text"
                defaultValue={config.categoryPageRecommendationId}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Checkout Recommendation Id
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="checkoutPageRecommendationId"
                type="text"
                defaultValue={config.checkoutPageRecommendationId}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Home Recommendation Id first
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="homePageRecommendationId1"
                type="text"
                defaultValue={config.homePageRecommendationId1}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Home Recommendation Id second
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="homePageRecommendationId2"
                type="text"
                defaultValue={config.homePageRecommendationId2}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="body2" component="div">
                Product page Recommendation Id
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="productPageRecommendationId"
                type="text"
                defaultValue={config.productPageRecommendationId}
                onChange={(e) =>
                  onChangeValue(e.target.id, e.target.value.trim())
                }
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" component="div">
                Category Selection
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: 0 }}>
              <List sx={{ display: "flex" }}>
                {[...config.nav, ...Array.from({ length: 3 })]
                  .slice(0, 3)
                  .map((item, key) => {
                    if(!topCategories[key]?.id) return null;
                    return (
                      <ListItem sx={{ p: 0 }} key={key.toString()}>
                        <Grid container>
                          <Grid item xs={10}>
                            <FormControl
                              variant="standard"
                              sx={{ m: 2, minWidth: 150, maxWidth: 180 }}
                            >
                              <InputLabel>Category {key + 1}</InputLabel>

                              <Select
                                id="categorySelect"
                                // value={item.key}
                                defaultValue={
                                  item?.key ||
                                  (topCategories?.length
                                    ? topCategories[key].id
                                    : "")
                                }
                                label={item?.label}
                                onChange={(v: SelectChangeEvent) => {
                                  console.log(v.target.value)
                                  onChangeValueNav(key, v.target.value)
                                }}
                                sx={{ maxWidth: 400 }}
                              >
                                {topCategories?.map((category) => (
                                  <MenuItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )
                  })}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  )
}
