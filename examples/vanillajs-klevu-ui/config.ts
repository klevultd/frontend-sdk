const klevu_ui_settings = {
  onProductClick: (product, event) => {
    alert(product.name + " is clicked")
  },
  generateProductUrl: (product) => {
    return undefined
  },
}

// @ts-expect-error
window.klevu_ui_settings = klevu_ui_settings
