<template>
  <div id="edit-marker">
    <div class="container field box is-4 has-text-centered">
      <delete-icon class="bin" @click="sendDeleteRequest" />
      <clear-icon class="clear" @click="clear" />
      <form @submit.prevent="sendEditRequest(false)">
        <div class="field">
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="Title"
              v-model="marker.title"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              type="date"
              class="input"
              placeholder="Date"
              v-model="marker.date"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea
              class="input"
              placeholder="Description"
              v-model="marker.description"
            ></textarea>
          </div>
        </div>
        <button class="button is-info is-large">Submit changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import DeleteIcon from "vue-material-design-icons/DeleteForever.vue";
import ClearIcon from "vue-material-design-icons/DeleteSweep.vue";
import Vue from "vue";

export default {
  name: "edit-marker",
  props: {
    marker: null,
  },
  components: {
    DeleteIcon,
    ClearIcon,
  },
  methods: {
    async sendEditRequest(noClose) {
      UserService.editMarker(this.marker).then(
        () => {
          Vue.toasted.global.markerSuccess().goAway(2900);
          this.$emit("edited", noClose);
        },
        (error) => {
          console.log(error);
          Vue.toasted.global.markerError().goAway(2900);
        }
      );
    },
    async sendDeleteRequest() {
      UserService.deleteMarker(this.marker).then(
        () => {
          Vue.toasted.global.deletedMarker().goAway(2900);
          this.$emit("edited", false);
        },
        (error) => {
          console.log(error);
          Vue.toasted.global.markerError().goAway(2900);
        }
      );
    },
    clear() {
      this.marker.description = "";
      this.marker.title = "";
      let date = new Date(Date.now()).toLocaleDateString().replace(/\./g, "-");
      this.marker.date =
        date.substring(6, 10) +
        date.substring(2, 5) +
        "-" +
        date.substring(0, 2);
      this.sendEditRequest(true);
    },
  },
};
</script>

<style scope>
#edit-marker {
  position: absolute;
  width: 18em;
}
textarea {
  min-height: 8em;
}

.material-design-icon.bin,
.material-design-icon.clear {
  height: 1.3em;
  width: 1.3em;
  position: absolute;
  top: -1.3em;
  left: -0.2em;
  z-index: 10;
  color: black;
  font-size: 2em;
  cursor: pointer;
}

.material-design-icon.clear {
  left: 1.2em;
  top: -1.375em;
  height: 1.45em;
  width: 1.45em;
}

.material-design-icon.bin > .material-design-icon__svg {
  height: 1.3em;
  width: 1.3em;
  color: #ee0000;
}

.material-design-icon.clear > .material-design-icon__svg {
  height: 1.45em;
  width: 1.45em;
}
@media (max-width: 4000px) {
  #edit-marker {
    top: 35%;
    left: 50%;
    margin-left: -8.2em;
  }
}
@media (max-width: 1200px) {
  #edit-marker {
    left: 50%;
    top: 40%;
    margin-left: -8.2em;
  }
}
</style>
