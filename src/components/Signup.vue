<template>
  <div id="register-panel" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <h3 class="title has-text-black">Sign up</h3>
        <hr class="login-hr is-dark" />
        <p class="subtitle has-text-black">Create your own map</p>
        <form @submit.prevent="sendRegisterRequest">
          <div class="field">
            <div class="control">
              <input
                v-model="user.username"
                type="text"
                class="input"
                placeholder="Login"
                autofocus
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="user.email"
                type="email"
                class="input"
                placeholder="E-mail"
                autofocus
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="user.password"
                type="password"
                class="input"
                placeholder="Password"
                autofocus
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="user.passwordr"
                type="password"
                class="input"
                placeholder="Repeat Password"
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
import User from "../models/user";

export default {
  name: "register-panel",
  data: function() {
    return {
      user: new User("", ""),
      loading: false,
    };
  },
  methods: {
    async sendRegisterRequest() {
      this.loading = true;
      if (
        this.user.username &&
        this.user.password &&
        this.user.passwordr &&
        this.user.email
      ) {
        if (this.user.username.length < 3) {
          Vue.toasted.global.loginShort().goAway(2900);
        } else {
          await this.$store.dispatch("auth/register", this.user).then(
            (user) => {
              this.$emit("pogchamp", user);
            },
            (error) => {
              this.loading = false;
              console.log(", errorString: " + error.toString());
            }
          );
        }
      } else {
        Vue.toasted.global.noData().goAway(2900);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://jenil.github.io/bulmaswatch/united/bulmaswatch.min.css";

#register-panel {
  position: absolute;
  top: 22%;
  width: 80%;
}
@media (max-width: 4000px) {
  #register-panel {
    left: 14%;
  }
}
@media (max-width: 1700px) {
  #register-panel {
    left: 11%;
  }
}
.box h3 {
  margin-top: 1em;
}
.box .subtitle {
  margin-bottom: 4vh;
}
.box {
  min-height: 50vh;
}
.box hr {
  background: #bbb;
}
</style>
