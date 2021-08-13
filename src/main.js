import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import "./assets/main.scss";
import { ToastPlugin } from "bootstrap-vue";
import VueClipboard from "vue-clipboard2";
import "@fontsource/jetbrains-mono";

VueClipboard.config.autoSetContainer = true; // add this line

Vue.use(VueClipboard);
Vue.use(ToastPlugin);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
