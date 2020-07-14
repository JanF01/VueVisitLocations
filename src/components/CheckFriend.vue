<template>
  <div id="login-panel" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <a class="delete is-medium" @click="close"></a>
        <h3 class="title has-text-black">Search</h3>
        <hr class="login-hr is-dark" />
        <p class="subtitle has-text-black">Put in your friend's username</p>
        <form @submit.prevent="sendMapRequest()">
          <div class="field">
            <div class="control">
              <input
                v-model="friend"
                type="text"
                class="input is-large"
                placeholder="Login"
                autofocus
              />
            </div>
          </div>
          <button
            type="submit"
            class="button is-block is-info is-large is-fullwidth"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import UserService from "../services/user.service";

export default {
  name: "check-friend",
  data: function() {
    return {
      friend: "",
      loading: false,
    };
  },
  methods: {
    async sendMapRequest() {
      if (this.friend.length >= 3) {
        await UserService.checkForUser(this.friend).then(
          (result) => {
            if (result.data == "User exists") {
              this.$emit("getfriend", this.friend);
            } else {
              Vue.toasted.global.noUser().goAway(2900);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        Vue.toasted.global.shortName().goAway(2900);
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://jenil.github.io/bulmaswatch/united/bulmaswatch.min.css";

#login-panel {
  position: absolute;
  top: 22%;
  width: 80%;
}
.delete {
  background: #a02060;
  margin-left: 93%;
}
@media (max-width: 4000px) {
  #login-panel {
    left: 14%;
  }
}
@media (max-width: 1700px) {
  #login-panel {
    left: 11%;
  }
}
.box h3 {
  margin-top: 1em;
}
.box .subtitle {
  margin-bottom: 4vh;
}
.box hr {
  background: #bbb;
}
.box button {
  margin-bottom: 3vh;
}
</style>
