import Vue from "vue";
import Toasted from "vue-toasted";
import App from "./App.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vuetify from "vuetify";

Vue.use(Toasted);

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "md",
});

Vue.toasted.register("logedIn", "Successful Login", {
  type: "success",
  icon: "check_circle",
});

Vue.toasted.register("noUser", "The user does not exist", {
  type: "error",
  icon: "error_outline",
});

Vue.toasted.register("wrongPassword", "Incorrect Password", {
  type: "error",
  icon: "error_outline",
});

Vue.toasted.register("logedIn", "Too short login", {
  type: "error",
  icon: "error_outline",
});


Vue.toasted.register("logedIn", "Didn't pass password requirements", {
  type: "error",
  icon: "error_outline",
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");