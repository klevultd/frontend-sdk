import { createApp } from "vue";
import App from "./App.vue";
import { KlevuComponents } from "@klevu/ui-vue";

import "./assets/main.css";

createApp(App).use(KlevuComponents).mount("#app");
