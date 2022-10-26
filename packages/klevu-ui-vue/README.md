# Klevu Vue components

This is an alpha version of Klevu Vue components. It's an automatic conversion from `@klevu/ui` package.

# Usage

## Prep

`npm install @klevu/ui-vue`

Update your project based on your Vue build system. Instructions can be found from https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue. Use `klevu-` as key for `isCustomElement`

## Import

Add Klevu component library to your main file:

```ts
import { createApp } from "vue"
import App from "./App.vue"
import { KlevuComponents } from "@klevu/ui-vue"

createApp(App).use(KlevuComponents).mount("#app")
```

## Start using

Find your components from `@klevu/ui` project and use them

# Example

Check out the [Hello World example here](../../examples/vue-klevu-ui/)
