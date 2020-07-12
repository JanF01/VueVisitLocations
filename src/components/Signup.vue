<template>
  <div id="register-panel" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <h3 class="title has-text-black">Sign up</h3>
        <hr class="login-hr is-dark" />
        <p class="subtitle has-text-black">Create your own map</p>
        <form @submit.prevent="register">
          <div class="field">
            <div class="control">
              <input
                v-model="username"
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
                v-model="email"
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
                v-model="password"
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
                v-model="passwordr"
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
import AuthService from "../services/auth.service";

export default {
  name: "register-panel",
  data: function() {
    return {
      username: "",
      password: "",
      passwordr: "",
      email: "",
    };
  },
  methods: {
    sendRegisterRequest() {
      AuthService.register({
        username: this.username,
        password: this.password,
        email: this.email,
      });
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
