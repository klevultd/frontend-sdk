import { KlevuRecord, KlevuFetch, visuallySimilar } from "@klevu/core"
import { Button, Drawer, Grid, Typography } from "@mui/material"
import { useState, useCallback, useEffect } from "react"
import { LoadingIndicator } from "./loadingIndicator"
import { Product } from "./product"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"

export const InspireMe = ({
  id,
  style,
}: {
  id: string
  style?: React.CSSProperties
}) => {
  const [vSimilar, setVSimilar] = useState<KlevuRecord[] | undefined>(undefined)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    if (vSimilar === undefined) {
      fetchProduct()
    }
    setShowModal(true)
  }

  const fetchProduct = useCallback(async () => {
    const res = await KlevuFetch(
      visuallySimilar([id], {
        limit: 6,
      })
    )
    setVSimilar(res.queriesById("visuallySimilar")?.records)
  }, [id])

  useEffect(() => {
    setVSimilar(undefined)
  }, [id])

  return (
    <div style={style}>
      <Button
        onClick={openModal}
        variant="outlined"
        color="primary"
        style={{ background: "#fff" }}
        startIcon={<AutoFixHighIcon />}
      >
        Inspire me
      </Button>
      <Drawer
        anchor="right"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <div style={{ padding: "24px", maxWidth: "666px" }}>
          <Typography variant="h4">Inspiration based on this item</Typography>
          <Grid
            container
            spacing={2}
            style={{
              margin: "24px",
            }}
          >
            {vSimilar ? (
              vSimilar.map((p) => (
                <Grid item>
                  <Product product={p} />
                </Grid>
              ))
            ) : (
              <LoadingIndicator />
            )}
          </Grid>
        </div>
      </Drawer>
    </div>
  )
}
