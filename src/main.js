import Vue from "vue";
import Toasted from "vue-toasted";
import App from "./App.vue";
import store from "./store";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vuetify from "vuetify";

import gmapsInit from "./utils/gmaps.js";

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



var google;

set();

async function set() {
  google = await gmapsInit()

  var pinColor = "black";

  var pinSVGHole =
    "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
  var labelOriginHole = new google.maps.Point(12, 15);


  Vue.prototype.$markerImage = {
    path: pinSVGHole,
    anchor: null,
    fillOpacity: 1,
    fillColor: pinColor,
    strokeWeight: 1,
    strokeColor: "black",
    scale: 2,
    labelOrigin: labelOriginHole,
  }

}




new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");