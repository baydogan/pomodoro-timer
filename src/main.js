import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import "./assets/index.css";

import FontAwesome from "./plugins/FontAwesome";



const app = createApp(App);
app.use(store);
app.use(FontAwesome);
app.use(router);
app.mount("#app");

