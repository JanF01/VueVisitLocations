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
                'is-active':
                  !(loginState || registerState || markerList || checkOut) &&
                  loggedIn,
              }"
              @click="goMap"
            >
              Map
            </a>
            <a
              class="navbar-item"
              v-if="loggedIn"
              v-bind:class="{
                'is-active':
                  !(loginState || registerState) && loggedIn && markerList,
              }"
              @click="goMarkerList"
            >
              Marker list
            </a>
            <a
              class="navbar-item"
              v-if="loggedIn && !editingBlocked"
              v-bind:class="{
                'is-active':
                  !(loginState || registerState) && loggedIn && checkOut,
              }"
              @click="goCheckout"
            >
              Friends
            </a>
            <a class="navbar-item" v-if="editingBlocked" @click="outCheckout">
              My map
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
    <marker-list
      v-if="markerList"
      v-bind:markers="markerInfo"
      @editmarker="goEditMarker"
    >
    </marker-list>
    <check-friend v-if="checkOut" @getfriend="getFriendPoints" @close="goMap">
    </check-friend>

    <div class="showMarker" v-if="checkingMarker">
      <div class="container field box is-4 has-text-centered">
        <div class="field">
          <h1 class="sub-title">{{ editedMarker.title }}</h1>
        </div>
        <div class="field">
          <h3 class="date">{{ editedMarker.date }}</h3>
        </div>
        <div class="field">
          <h3 class="description">{{ editedMarker.description }}</h3>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LoginPanel from "./components/Login";
import RegisterPanel from "./components/Signup";
import EditMarker from "./components/EditMarker";
import MarkerList from "./components/MarkerList";
import CheckFriend from "./components/CheckFriend";

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
      checkingMarker: false,
      checkOut: false,
      map: null,
      markerList: false,
      markerInfo: [],
      editingBlocked: false,
      checkoutTimeout: null,
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
  components: {
    LoginPanel,
    RegisterPanel,
    EditMarker,
    MarkerList,
    CheckFriend,
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
      this.markerList = false;
      this.checkOut = false;
      this.openMobileMenu();
    },
    goMarkerList() {
      this.markerList = true;
      this.openMobileMenu();
    },
    goCheckout() {
      this.markerList = false;
      this.checkOut = true;
      this.openMobileMenu();
    },
    outCheckout() {
      this.checkOut = false;
      this.openMobileMenu();
      this.getPoints("-");
    },
    login() {
      this.loginState = true;
      this.registerState = false;
      this.openMobileMenu();
    },
    register() {
      this.loginState = false;
      this.registerState = true;
      this.openMobileMenu();
    },
    logOut() {
      this.$store.dispatch("auth/logout", this.user);
    },
    overInfoBox(marker, event) {
      this.checkingMarker = true;
      this.editedMarker = marker;
      this.checkoutTimeout = setTimeout(() => {
        let box = document.querySelector(".showMarker");
        box.style.left = event.tb.clientX + 50 + "px";
        box.style.top = event.tb.clientY - 100 + "px";
      }, 200);
    },
    leaveInfoBox() {
      clearTimeout(this.checkoutTimeout);
      this.checkingMarker = false;
    },
    goEditMarker(marker) {
      if (!this.editingBlocked) {
        this.checkingMarker = false;

        this.map.setZoom(12);

        let pos = { lat: marker.lat, lng: marker.lng };

        this.map.setCenter(pos);
        this.map.panBy(0, 200);

        this.editedMarker = marker;

        this.editMarker = true;
        this.markerList = false;
      }
    },
    markerEdited(noClose) {
      if (!noClose) {
        this.editMarker = false;
        this.marker = null;
      }
      this.getPoints("-");
    },
    getFriendPoints(friend) {
      this.checkOut = false;
      this.editingBlocked = true;
      this.getPoints(friend);
    },
    async getPoints(target) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers.length = 0;
      this.markerInfo.length = 0;

      const google = await gmapsInit();

      this.$markerImage.anchor = new google.maps.Point(12, 17);

      UserService.getUserPoints(target).then(
        (points) => {
          for (let marker of points.data) {
            let Marker = new google.maps.Marker({
              position: {
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              },
              map: this.map,
              title: marker.title,
              icon: this.$markerImage,
              animation: google.maps.Animation.BOUNCE,
            });

            let edited = new MarkerInfo(
              null,
              parseFloat(marker.lat),
              parseFloat(marker.lng),
              marker.title,
              marker.country,
              marker.description,
              marker.date
            );

            Marker.addListener("click", () => {
              this.map.setZoom(11);
              this.map.setCenter(Marker.getPosition());
              this.map.panBy(0, 200);

              this.goEditMarker(edited);
            });
            Marker.addListener("mouseover", (e) => {
              this.overInfoBox(edited, e);
            });
            Marker.addListener("mouseout", () => {
              this.leaveInfoBox();
            });

            this.markers.push(Marker);
            this.markerInfo.push(edited);

            setTimeout(() => {
              Marker.setAnimation(null);
            }, 600);
          }
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    async getPoint(lat, lng) {
      const google = await gmapsInit();

      this.$markerImage.anchor = new google.maps.Point(12, 17);

      UserService.getUserPoint(lat, lng).then(
        (point) => {
          let Marker = new google.maps.Marker({
            position: {
              lat: parseFloat(point.data.lat),
              lng: parseFloat(point.data.lng),
            },
            map: this.map,
            title: point.data.title,
            icon: this.$markerImage,
            animation: google.maps.Animation.BOUNCE,
          });

          let edited = new MarkerInfo(
            null,
            parseFloat(point.data.lat),
            parseFloat(point.data.lng),
            point.data.title,
            point.data.country,
            point.data.description,
            point.data.date
          );

          Marker.addListener("click", () => {
            this.map.setZoom(11);
            this.map.setCenter(Marker.getPosition());
            this.map.panBy(0, 200);

            this.goEditMarker(edited);
          });
          Marker.addListener("mouseover", (e) => {
            this.overInfoBox(edited, e);
          });
          Marker.addListener("mouseout", () => {
            this.leaveInfoBox();
          });

          this.markers.push(Marker);
          this.markerInfo.push(edited);

          setTimeout(() => {
            Marker.setAnimation(null);
          }, 600);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
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

      this.$markerImage.anchor = new google.maps.Point(12, 17);

      if (this.loggedIn) {
        UserService.getUserPublic().then(
          () => {},
          (error) => {
            return Promise.reject(error);
          }
        );

        this.getPoints("-");

        map.addListener("click", (event) => {
          this.editMarker = false;
          var Marker = new google.maps.Marker({
            position: event.latLng,
            map: null,
            icon: this.$markerImage,
          });

          var latlng = {
            lat: Marker.getPosition().lat(),
            lng: Marker.getPosition().lng(),
          };

          geocoder.geocode({ location: latlng }, async (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                for (let res of results) {
                  if (res.types.includes("country")) {
                    let info = new MarkerInfo(
                      null,
                      Marker.getPosition().lat(),
                      Marker.getPosition().lng(),
                      "",
                      res.formatted_address,
                      "",
                      Date.now()
                    );

                    UserService.addMarker(info).then(
                      () => {
                        this.getPoint(info.lat, info.lng);
                      },
                      (error) => {
                        return Promise.reject(error);
                      }
                    );
                  }
                }
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          });
        });
        map.addListener("drag", () => {
          this.editMarker = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
@import "https://jenil.github.io/bulmaswatch/united/bulmaswatch.min.css";

body {
  margin: 0 auto;
  overflow: hidden;
}
main {
  overflow: hidden;
}
.navbar-item > h1 {
  color: white;
}

.map {
  width: 97%;
  height: 97%;
  overflow: hidden;
}
.map > img {
  width: 98%;
}

.App {
  width: 100vw;
  height: 94vh;
}

.showMarker {
  position: absolute;
  width: 18em;
}
</style>
