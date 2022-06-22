import { KlevuFetch, search, suggestions } from "@klevu/core"
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
    search(searchTerm, {
      id: "search", // not required as for default it's the same.
      fields: ["name", "price", "url", "category"],
    })
  )

  printToOutput(result.suggestionsById("suggestions")?.suggestions)
  printToOutput(result.queriesById("search")?.records)
}, 300)
