import { FormControlLabel, Switch, Typography } from "@mui/material"
import { useState } from "react"

import { Category } from "../components/category"

export function CategoryPage() {
  const [showPersonalsation, setShowPersonalsation] = useState(false)
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            color="info"
            checked={showPersonalsation}
            onChange={(e) => setShowPersonalsation(e.target.checked)}
          />
        }
        label="Show Personalised Section"
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
        {showPersonalsation && (
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
