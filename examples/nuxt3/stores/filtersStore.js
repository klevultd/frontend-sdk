import { defineStore } from "pinia"
import { KlevuEvents } from "@klevu/core"

const useCart = defineStore("filters-store", {
  state: () => {
    return {
      filters: [],
      open: false,
    }
  },
  actions: {},
})

export default useCart
