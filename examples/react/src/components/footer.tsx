import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { config, saveConfig } from "../config"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
}

export function Footer() {
  const [open, setOpen] = useState(false)
  const [inputConfig, setInputConfig] = useState(
    JSON.stringify(config, undefined, 2)
  )

  const onSave = () => {
    saveConfig(JSON.parse(inputConfig))
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div
      style={{
        marginTop: "2rem",
        background: "#0c4563",
        color: "#fff",
        padding: "3rem",
      }}
    >
      <Container maxWidth="lg" style={{ fontSize: "12px" }}>
        <Box m="3">
          <Typography variant="h6" style={{ color: "#fff" }}>
            Links
          </Typography>
          <ul>
            <li>
              <a href="https://www.klevu.com" target="_blank">
                Klevu homepage
              </a>
            </li>
            <li>
              <a
                href="https://github.com/klevultd/frontend-sdk/blob/master/packages/klevu-core/README.md"
                target="_blank"
              >
                @klevu/core GitHub
              </a>
            </li>
            <li>
              <a href="https://developers.klevu.com/" target="_blank">
                Klevu Developers
              </a>
            </li>
          </ul>
          <Typography
            variant="body2"
            style={{ color: "#fff", textAlign: "center" }}
          >
            &copy; Klevu 2022
          </Typography>
          <Button onClick={() => setOpen(true)}>Change configuration</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                inputProps={{
                  style: {
                    fontSize: "12px",
                  },
                }}
                multiline
                rows={20}
                label="Config"
                value={inputConfig}
                onChange={(e) => setInputConfig(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={onSave}>
                Save
              </Button>
            </Box>
          </Modal>
        </Box>
      </Container>
    </div>
  )
}
