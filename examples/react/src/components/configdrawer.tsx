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
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import { config, saveConfig, resetConfig } from "../config"

const stylesDrawer = {
  maxWidth: 900,
  minWidth: 600,
  width: "75%",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    maxWidth: 900,
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

  const inputConfig = useRef(config)

  const onChangeValue = (id, value) => {
    inputConfig.current[id] = value
  }
  const onChangeValueNav = (id, value) => {
    let [name, key] = id.split("-")
    inputConfig.current.nav[key][name] = value
  }

  const onSave = () => {
    saveConfig(inputConfig.current)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
  const onReset = () => {
    resetConfig()
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
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
        <Box p={1} textAlign="center" role="configurations">
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="div">
                Configurations
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    onClick={onReset}
                    variant="outlined"
                    color="secondary"
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={onSave} variant="outlined" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
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
                Category
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <List>
                  <ListItem>
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <Typography variant="body2" component="div">
                          Key
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body2" component="div">
                          Label
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body2" component="div">
                          Emoji
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {config.nav.map((item, key) => (
                    <ListItem key={item.key}>
                      <Grid container spacing={2}>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            id={"key-" + key}
                            type="text"
                            defaultValue={item.key}
                            onChange={(e) =>
                              onChangeValueNav(
                                e.target.id,
                                e.target.value.trim()
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            id={"label-" + key}
                            type="text"
                            defaultValue={item.label}
                            onChange={(e) =>
                              onChangeValueNav(
                                e.target.id,
                                e.target.value.trim()
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            fullWidth
                            id={"emoji-" + key}
                            type="text"
                            defaultValue={item.emoji}
                            onChange={(e) =>
                              onChangeValueNav(
                                e.target.id,
                                e.target.value.trim()
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  )
}
