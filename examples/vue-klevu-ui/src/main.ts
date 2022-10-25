import { createApp } from "vue";
import App from "./App.vue";
import { ComponentLibrary } from "@klevu/ui-vue";

import "./assets/main.css";

createApp(App).use(ComponentLibrary).mount("#app");
