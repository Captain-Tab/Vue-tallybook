import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/views/Nav.vue";

Vue.config.productionTip = false;
Vue.component("nav", Nav);

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount("#app");
