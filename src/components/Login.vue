<template>
  <div id="login-panel" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <h3 class="title has-text-black">Login</h3>
        <hr class="login-hr is-dark" />
        <p class="subtitle has-text-black">Please login to proceed</p>
        <form @submit.prevent="sendLoginRequest()">
          <div class="field">
            <div class="control">
              <input
                v-model="username"
                type="text"
                class="input is-large"
                placeholder="Login"
                autofocus
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="password"
                type="password"
                class="input is-large"
                placeholder="Password"
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
import Vue from "vue";

export default {
  name: "login-panel",
  data: function() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async sendLoginRequest() {
      var body = {
        username: this.username,
        password: this.password,
      };
      try {
        fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            response.text().then((value) => {
              if (value == "User does not exist") {
                Vue.toasted.global.noUser().goAway(2900);
              } else if (value == "Wrong password") {
                Vue.toasted.global.wrongPassword().goAway(2900);
              }
            });
          })
          .then(() => {});
      } catch (error) {
        console.log(error);
      }
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
