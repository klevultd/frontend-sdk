import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import { createPinia } from "pinia"
import "./main.css"

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount("#app")
