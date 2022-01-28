import { search } from "@klevu/core"
import Vue from "vue"

const app = new Vue({
  el: "#vueroot",
  data: {
    products: [],
  },
  watch: {
    search: function (value) {
      console.log(value)
    },
  },
  methods: {
    search: function (event) {
      console.log(event.target.value)
    },
  },
})
