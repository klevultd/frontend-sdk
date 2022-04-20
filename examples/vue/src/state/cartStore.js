import { defineStore } from "pinia"
import { KlevuEvents } from "@klevu/core"

const useCart = defineStore("cart-store", {
  state: () => {
    return {
      products: [],
    }
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
  },
})

export default useCart
