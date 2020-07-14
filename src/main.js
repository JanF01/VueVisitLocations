import Vue from "vue";
import Toasted from "vue-toasted";
import App from "./App.vue";
import store from "./store";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vuetify from "vuetify";

Vue.use(Toasted);
Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "md",
});

//Friend

Vue.toasted.register("shortName", "Too short nick", {
  type: "error",
  icon: "error_outline",
});

Vue.toasted.register("friendSuccess", "Here is your friend's map", {
  type: "success",
  icon: "check_circle",
});

// Markers

Vue.toasted.register("markerSuccess", "Marker Edited", {
  type: "success",
  icon: "check_circle",
});

Vue.toasted.register("deletedMarker", "Marker Deleted", {
  type: "info",
  icon: "check_circle",
});

Vue.toasted.register("markerError", "There was an issue", {
  type: "error",
  icon: "error_outline",
});

// RegisterLogin

Vue.toasted.register("passwordsDontMatch", "Passwords don't match", {
  type: "error",
  icon: "error_outline",
});

Vue.toasted.register("nickUsed", "The nick has been used", {
  type: "error",
  icon: "error_outline",
});

Vue.toasted.register("registerSuccess", "Register Successfull", {
  type: "success",
  icon: "check_circle",
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

Vue.toasted.register("loginShort", "Too short login (3 minimum)", {
  type: "error",
  icon: "error_outline",
});

Vue.toasted.register("noData", "Fill in login and password", {
  type: "error",
  icon: "error_outline",
});

Vue.toasted.register("passwordError", "Password too short (5 minimum)", {
  type: "error",
  icon: "error_outline",
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
