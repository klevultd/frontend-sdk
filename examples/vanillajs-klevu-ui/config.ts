// simulate lazy loading config later on. This is just for demo purpose.
setTimeout(() => {
  const init = document.querySelector("klevu-init")
  console.log("changing settings", init)

  init.settings = {
    onItemClick: (product, event) => {
      alert(product.name + " is clicked")
    },
    generateProductUrl: (product) => {
      return "/product/" + product.id
    },
    renderPrice: (amount, currency) => {
      // Something very custom and hardcoded.
      return `$${amount}`
    },
  }
  // load settings after 3 seconds
}, 3000)
