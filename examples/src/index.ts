import { KlevuConfig, search, KlevuTypeOfRecord } from "@klevu/core"
import debounce from "lodash.debounce"

KlevuConfig.init({
  url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-156925593843210765",
})

const onChange = debounce(async (event) => {
  console.log(event.target.value)
  const result = await search({
    query: {
      term: event.target.value,
    },
    limit: 5,
    typeOfRecords: [KlevuTypeOfRecord.Product],
    fields: ["id", "name", "image", "url"],
  })

  let html = ""
  for (const p of result.queryResults[0].records) {
    html += `<div class="product"><img src="${p.imageUrl}" />
      <p>${p.name}</p>
      <a href="${p.url}">Buy now</a>
    </div>`
  }

  document.getElementById("vanillaresult").innerHTML = html
}, 300)

document.getElementById("vanillasearch").onchange = onChange
