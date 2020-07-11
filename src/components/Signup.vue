<template>
  <div id="register-panel" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <h3 class="title has-text-black">Sign up</h3>
        <hr class="login-hr is-dark" />
        <p class="subtitle has-text-black">Create your own map</p>
        <form>
          <div class="field">
            <div class="control">
              <input
                v-model="login"
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
          <button class="button is-block is-info is-large is-fullwidth">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register-panel",
  props: {
    login: String,
    password: String,
    passwordr: String,
    email: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://jenil.github.io/bulmaswatch/united/bulmaswatch.min.css";

#register-panel {
  position: absolute;
  top: 22%;
  left: 14%;
  width: 80%;
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
