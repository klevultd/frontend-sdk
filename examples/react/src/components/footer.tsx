import { Box, Container, Typography } from "@mui/material"

export function Footer() {
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
        </Box>
      </Container>
    </div>
  )
}
