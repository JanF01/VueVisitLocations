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
              @click="goMap"
            >
              Map
            </a>
            <a
              class="navbar-item"
              v-bind:class="{ 'is-active': loginState && !loggedIn }"
              v-if="!loggedIn"
              @click="login"
            >
              Log in
            </a>
            <a
              class="navbar-item"
              v-bind:class="{ 'is-active': registerState && !loggedIn }"
              v-if="!loggedIn"
              @click="register"
            >
              Sign up
            </a>
            <a class="navbar-item" @click="logOut" v-if="loggedIn">
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>
    <section class="map App"></section>

    <login-panel v-if="loginPanel && !loggedIn"></login-panel>
    <register-panel
      v-if="registerPanel && !loggedIn"
      @pogchamp="login"
    ></register-panel>
    <edit-marker
      v-if="editMarker"
      v-bind:marker="editedMarker"
      @edited="markerEdited"
    ></edit-marker>
  </main>
</template>

<script>
import LoginPanel from "./components/Login.vue";
import RegisterPanel from "./components/Signup.vue";
import EditMarker from "./components/EditMarker.vue";
import UserService from "./services/user.service";
import gmapsInit from "./utils/gmaps.js";

import User from "./models/user";
import MarkerInfo from "./models/marker";

export default {
  name: "App",
  data: function() {
    return {
      user: new User("", ""),
      loginState: false,
      registerState: true,
      editMarker: false,
      markers: [],
      editedMarker: null,
      map: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    loginPanel() {
      return this.loginState;
    },
    registerPanel() {
      return this.registerState;
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
    goMap() {
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
    logOut() {
      this.$store.dispatch("auth/logout", this.user);
    },
    markerEdited() {
      this.editMarker = false;
      this.marker = null;
      this.getPoints();
    },
    async getPoints() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers.length = 0;

      const google = await gmapsInit();

      var pinColor = "black";

      var pinSVGHole =
        "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
      var labelOriginHole = new google.maps.Point(12, 15);

      var markerImage = {
        path: pinSVGHole,
        anchor: new google.maps.Point(12, 17),
        fillOpacity: 1,
        fillColor: pinColor,
        strokeWeight: 1,
        strokeColor: "black",
        scale: 2,
        labelOrigin: labelOriginHole,
      };

      UserService.getUserPoints().then(
        (points) => {
          for (let marker of points.data) {
            let Marker = new google.maps.Marker({
              position: {
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              },
              map: this.map,
              title: marker.title,
              icon: markerImage,
              animation: google.maps.Animation.BOUNCE,
            });

            Marker.addListener("click", () => {
              this.map.setZoom(11);
              this.map.setCenter(Marker.getPosition());
              this.map.panBy(0, 200);

              this.editMarker = true;
              this.editedMarker = new MarkerInfo(
                null,
                parseFloat(marker.lat),
                parseFloat(marker.lng),
                marker.title,
                marker.description,
                marker.date
              );
            });

            setTimeout(() => {
              Marker.setAnimation(null);
            }, 1000);

            this.markers.push(Marker);
          }
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
  components: {
    LoginPanel,
    RegisterPanel,
    EditMarker,
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

      this.map = map;

      geocoder.geocode({ address: "Poland" }, (result, status) => {
        if (status !== "OK" || !result[0]) {
          throw new Error(status);
        }

        map.setCenter(result[0].geometry.location);
        map.fitBounds(result[0].geometry.viewport);
      });

      var pinColor = "black";

      var pinSVGHole =
        "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
      var labelOriginHole = new google.maps.Point(12, 15);

      var markerImage = {
        path: pinSVGHole,
        anchor: new google.maps.Point(12, 17),
        fillOpacity: 1,
        fillColor: pinColor,
        strokeWeight: 1,
        strokeColor: "black",
        scale: 2,
        labelOrigin: labelOriginHole,
      };

      if (this.loggedIn) {
        UserService.getUserPublic().then(
          () => {},
          (error) => {
            return Promise.reject(error);
          }
        );

        this.getPoints(google);
      }

      map.addListener("click", (event) => {
        this.editMarker = false;
        var Marker = new google.maps.Marker({
          position: event.latLng,
          map: map,
          title: "Your title",
          icon: markerImage,
          animation: google.maps.Animation.BOUNCE,
        });

        let info = new MarkerInfo(
          null,
          Marker.getPosition().lat(),
          Marker.getPosition().lng(),
          Marker.title,
          "",
          Date.now()
        );

        UserService.addMarker(info).then(
          () => {},
          (error) => {
            return Promise.reject(error);
          }
        );
        Marker.addListener("click", () => {
          map.setZoom(12);
          map.setCenter(Marker.getPosition());
          map.panBy(0, 200);

          this.editMarker = true;
          this.editedMarker = info;
        });
        setTimeout(() => {
          Marker.setAnimation(null);
        }, 600);

        this.markers.push(Marker);
      });
      map.addListener("drag", () => {
        this.editMarker = false;
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
