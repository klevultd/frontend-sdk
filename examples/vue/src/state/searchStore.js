import { defineStore } from "pinia"

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useSearch = defineStore("search-store", {
  state: () => {
    return {
      searchTerm: "",
    }
  },
})

export default useSearch
