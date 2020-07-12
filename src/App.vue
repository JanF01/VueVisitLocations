<template>
  <main id="app">
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <h1 class="subtitle">
              Journey Map
            </h1>
          </a>
          <div
            aria-label="menu"
            aria-expanded="false"
            class="navbar-burger burger"
            data-target="navbarMenuHero"
            @click="openMobileMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div id="navbarMenuHero" class="navbar-menu">
          <div class="navbar-end">
            <a
              class="navbar-item"
              v-bind:class="{
                'is-active': !(loginState || registerState) || loggedIn,
              }"
              @click="map"
            >
              Map
            </a>
            <a
              class="navbar-item"
              v-bind:class="{ 'is-active': loginState && !loggedIn }"
              @click="login"
            >
              Log in
            </a>
            <a
              class="navbar-item"
              v-bind:class="{ 'is-active': registerState && !loggedIn }"
              @click="register"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
    <section class="map App"></section>

    <login-panel v-if="loginState && !loggedIn"></login-panel>
    <register-panel v-if="registerState && !loggedIn"></register-panel>
  </main>
</template>

<script>
import LoginPanel from "./components/Login.vue";
import RegisterPanel from "./components/Signup.vue";
import gmapsInit from "./utils/gmaps.js";

import User from "./models/user";

export default {
  name: "App",
  data: function() {
    return {
      user: new User("", ""),
      loginState: false,
      registerState: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.loginState = false;
      this.registerState = false;
    }
  },
  methods: {
    openMobileMenu() {
      document.querySelector(".navbar-menu").classList.toggle("is-active");
      document.querySelector(".navbar-burger").classList.toggle("is-active");
    },
    map() {
      this.loginState = false;
      this.registerState = false;
    },
    login() {
      this.loginState = true;
      this.registerState = false;
    },
    register() {
      this.loginState = false;
      this.registerState = true;
    },
  },
  components: {
    LoginPanel,
    RegisterPanel,
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.querySelector(".App"), {
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 65,
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: "50",
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [
              {
                lightness: "30",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [
              {
                lightness: "40",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                hue: "#ffff00",
              },
              {
                lightness: -25,
              },
              {
                saturation: -97,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [
              {
                lightness: -25,
              },
              {
                saturation: -100,
              },
            ],
          },
        ],
      });

      geocoder.geocode({ address: "Poland" }, (result, status) => {
        if (status !== "OK" || !result[0]) {
          throw new Error(status);
        }

        map.setCenter(result[0].geometry.location);
        map.fitBounds(result[0].geometry.viewport);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
@import "https://jenil.github.io/bulmaswatch/united/bulmaswatch.min.css";

.navbar-item > h1 {
  color: white;
}

.map {
  width: 100%;
  height: 100%;
}
.map > img {
  width: 100%;
}

.App {
  width: 100vw;
  height: 95vh;
}
</style>
