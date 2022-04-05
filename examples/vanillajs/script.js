import { KlevuConfig, KlevuFetch, search } from "@klevu/core"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})

async function load() {
  const result = await KlevuFetch(search("t-shirt", {}))
  document.getElementById("output").innerHTML = JSON.stringify(
    result.queriesById("search").records,
    undefined,
    2
  )
}

load()
