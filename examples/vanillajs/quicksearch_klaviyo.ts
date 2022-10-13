import {
  KlevuFetch,
  KlevuTypeOfRecord,
  search,
  suggestions,
  fallback,
  trendingProducts,
} from "@klevu/core"
import { clearOutput, debounce, printToOutput } from "./utils"

// get the textfield
const searchTextfield = document.getElementById("search") as HTMLInputElement

// add event make search when key is up in search field
searchTextfield?.addEventListener("keyup", () => {
  fetch()
})

// the actual fetch function. Surrounded with debounce so that we are not spamming Klevu API
const fetch = debounce(async function load() {
  // clear last result
  clearOutput()

  // Any rules we wish to have before doing the request
  const searchTerm = searchTextfield.value
  if (searchTerm.length < 3) {
    return
  }

  const result = await KlevuFetch(
    suggestions(searchTerm, {
      id: "suggestions", // not required. as default it's the same.
    }),
    search(
      searchTerm,
      {
        id: "search", // not required as for default it's the same.
        fields: [
          "name",
          "price",
          "url",
          "category",
          "id",
          "price",
          "salePrice",
          "image",
        ],
      },
      fallback(trendingProducts())
    )
  )
  const firstQuery = result.queriesById("search") //search-fallback
  const records = result.queriesById("search")?.records
  if (records.length > 0) {
    const product = records[0]
    const annotations = await firstQuery.annotationsById(product.id, "en")
    if (annotations.responseMessage === "SUCCESS") {
      let printOut = {
        "Search Term": firstQuery.meta.searchedTerm,
        "Search Term(full)": annotations.annotations.fullTerm,
        Subjects: annotations.annotations.subjects,
        "Total Number of Product Results": firstQuery.meta.totalResultsFound,
        "Product Clicked": {
          name: product.name,
          id: product.id,
          url: product.url,
          image: product.image,
          price: product.price,
          salePrice: product.salePrice,
        },
        "Search Results": [],
      }
      let numProductAdded = 0
      records.forEach((element) => {
        if (numProductAdded < 10) {
          printOut["Search Results"].push(element)
          numProductAdded++
        }
      })
      printToOutput(printOut)
    }
  }
}, 300)
