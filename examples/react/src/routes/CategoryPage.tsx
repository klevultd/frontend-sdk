import { FormControlLabel, Switch, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"

import { Category } from "../components/category"

export function CategoryPage() {
  const [showPersonalisation, setShowPersonalisation] = useState(
    !!localStorage.getItem("klevu-react-app-show-personalisation") || false
  )
  const reloadCalledRef = useRef(false)
  const handlePersonalisationToggle = (val: boolean) => {
    if (val) {
      const lastClicks = localStorage.getItem("klevu-last-clicks")
      const lastCatClicks = localStorage.getItem("klevu-last-clicks-cat")
      if (lastClicks) {
        const parsedClicks = JSON.parse(lastClicks)
        const itemsToTake = Math.floor(parsedClicks.length / 3) * 3
        const ids = Array.from(parsedClicks)
          .reverse()
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          )
          .slice(0, itemsToTake)
          .map((i) => i.id)
        let parsedCatClicks
        if (lastCatClicks) {
          parsedCatClicks = JSON.parse(lastCatClicks)
          parsedCatClicks.ids = ids
          parsedCatClicks.cached = new Date()
        } else {
          parsedCatClicks = {
            ids,
            cached: new Date(),
          }
        }
        localStorage.setItem(
          "klevu-last-clicks-cat",
          JSON.stringify(parsedCatClicks)
        )
      }
      localStorage.setItem("klevu-react-app-show-personalisation", "true")
      reloadCalledRef.current = true
      window.location.reload()
    } else {
      localStorage.removeItem("klevu-react-app-show-personalisation")
      setShowPersonalisation(false)
    }
  }
  useEffect(() => {
    return () => {
      if (!reloadCalledRef.current)
        localStorage.removeItem("klevu-react-app-show-personalisation")
    }
  }, [])
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            color="info"
            checked={showPersonalisation}
            onChange={(e) => handlePersonalisationToggle(e.target.checked)}
          />
        }
        label="Show Personalised Section (will reload page)"
      />
      <div
        style={{
          display: "flex",
          maxWidth: "100vw",
          gap: "20px",
          marginInline: "50px",
        }}
      >
        <div
          style={{
            width: "100%",
            overflowX: "scroll",
            padding: "20px",
          }}
        >
          <h3>&nbsp;</h3>
          <Category type="" />
        </div>
        {showPersonalisation && (
          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              padding: "20px",
              borderLeft: "1px solid gray",
            }}
          >
            <Typography
              style={{
                textDecoration: "underline",
                color: "#666",
              }}
              variant="h4"
            >
              Personalised
            </Typography>
            <Category type="personalisation" />
          </div>
        )}
      </div>
    </div>
  )
}
