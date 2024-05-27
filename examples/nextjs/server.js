// Current not working due NextJS bug: https://github.com/vercel/next.js/issues/54977

const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const { renderToString } = require("@klevu/ui/hydrate")

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = process.env.PORT || 3001
// when using middleware `hostname` and `port` must be provided below
const app = next({ hostname, port, dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname.startsWith("/_next") || pathname.startsWith("/__next")) {
        await handle(req, res, parsedUrl)
      } else {
        const html = await app.renderToHTML(req, res, pathname, query)
        const hydrated = await renderToString(html)
        res.end(hydrated.html)
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("internal server error")
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
