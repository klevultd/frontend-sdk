// Try removing the quicksearch
try {
  document.getElementsByTagName("klevu-quicksearch")[0].remove()
} catch (e) {}

// find the init component
const init = document.getElementsByTagName("klevu-init")[0]

// create a new search field
const searchField = document.createElement("klevu-search-field")
searchField.setAttribute("fallback-term", "jeans")
searchField.setAttribute("placeholder", "Custom placeholder")
searchField.setAttribute("search-categories", "true")
searchField.setAttribute("search-cms-pages", "true")
searchField.setAttribute("search-products", "true")
searchField.setAttribute("search-suggestions", "true")
searchField.setAttribute("limit", "4")

// create a new product list
const productList = document.createElement("div")
productList.innerHTML = "Hello world!"

// create a new modal drawer
const modalDrawer = document.createElement("klevu-modal")
modalDrawer.appendChild(productList)

// add the search field and modal drawer to the init component
init.appendChild(searchField)
init.appendChild(modalDrawer)

// listen for search results from search field
searchField.addEventListener("klevuSearchResults", (event) => {
  console.log("klevuSearchResults", event.detail)

  // remove the old product list
  productList.innerHTML = ""

  // create a new click event
  const clickEvent = event.detail.search.getSearchClickSendEvent()

  // add the new products to the product list
  for (const p of event.detail.search.records) {
    const product = document.createElement("klevu-product")
    product.variant = "line"
    product.product = p

    // create add to cart button for each product
    const addToCart = document.createElement("klevu-button")
    addToCart.innerHTML = "Add to cart"
    addToCart.slot = "bottom"
    product.appendChild(addToCart)

    productList.appendChild(product)

    // listen for clicks on the product
    product.addEventListener("klevuProductClick", (event) => {
      // send analytics
      clickEvent(p.id)
    })
  }

  modalDrawer.openModal()
})
