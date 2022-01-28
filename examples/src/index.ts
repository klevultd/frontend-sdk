import {
  KlevuConfig,
  search,
  KlevuFetch,
  newArrivals,
  listFilters,
  applyFilters,
} from "@klevu/core"
import debounce from "lodash.debounce"

KlevuConfig.init({
  url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-156925593843210765",
})

const onChange = debounce(async (event) => {
  const result = await KlevuFetch(
    listFilters(["color"]),
    search(event.target.value, {
      limit: 10,
      fields: ["image"],
      offset: 100,
    }),
    newArrivals()
  )

  let html = ""
  for (const p of result.queryResults.search.records) {
    html += `<div class="product"><img src="${p.imageUrl}" />
      <p>${p.name}</p>
      <a href="${p.url}">Buy now</a>
    </div>`
  }

  document.getElementById("vanillaresult").innerHTML = html
}, 300)

document.getElementById("vanillasearch").onchange = onChange
