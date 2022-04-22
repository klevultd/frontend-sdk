import { Box, Container, Typography } from "@mui/material"

export function Footer() {
  return (
    <div
      style={{
        marginTop: "2rem",
        background: "#333",
        color: "#ccc",
        padding: "3rem",
      }}
    >
      <Container maxWidth="lg">
        <Box m="3">
          <Typography variant="h6">Links</Typography>
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
        </Box>
      </Container>
    </div>
  )
}
