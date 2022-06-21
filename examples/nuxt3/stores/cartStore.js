import { defineStore } from "pinia"
import { KlevuEvents } from "@klevu/core"

const useCart = defineStore("cart-store", {
  state: () => {
    return {
      products: [],
      open: false,
      snackbarType: "",
      snackbarMessage: "",
      showSnackbar: false,
    }
  },
  getters: {
    subtotal(state) {
      let currency
      const displaySubtotal = state.products.reduce((price, item) => {
        if (!currency && item.product.currency) currency = item.product.currency
        return item.amount * item.product.price + price
      }, 0)
      return displaySubtotal
        ? new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency,
          }).format(displaySubtotal)
        : 0
    },
    cartTotalQuantity(state) {
      const displayQuantity = state.products.reduce(
        (qty, item) => qty + item.amount,
        0
      )
      return displayQuantity
    },
  },
  actions: {
    addProduct(product, quantity) {
      const found = this.products.findIndex(
        (p) => p.product.id == product.id
        // && p.product.itemGroupId == product.itemGroupId
      )
      if (found != -1) {
        this.products[found].amount += quantity
      } else {
        this.products.push({ product, amount: quantity })
      }
    },
    updateProduct(product, quantity) {
      const found = this.products.findIndex(
        (p) => p.product.id == product.id
        // &&  p.product.itemGroupId == product.itemGroupId
      )
      if (found != -1) {
        this.products[found].amount = quantity
      } else {
        this.products.push({ product, amount: quantity })
      }
    },
    removeProduct(product) {
      const found = this.products.findIndex(
        (p) => p.product.id == product.id
        // && p.product.itemGroupId == product.itemGroupId
      )
      if (found != -1) {
        this.products.splice(found, 1)
      }
    },
    emptyCart() {
      this.products = []
    },
    buy() {
      KlevuEvents.buy(this.products)

      this.emptyCart()
    },
    snackbar(type, message) {
      this.snackbarType = type
      this.snackbarMessage = message
      this.showSnackbar = true
      setTimeout(() => {
        this.snackbarType = ""
        this.snackbarMessage = ""
        this.showSnackbar = false
      }, 2800)
    },
  },
})

export default useCart
