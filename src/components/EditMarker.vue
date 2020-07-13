<template>
  <div id="edit-marker">
    <div class="container field box is-4 has-text-centered">
      <form @submit.prevent="sendEditRequest">
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

export default {
  name: "edit-marker",
  props: {
    marker: null,
  },
  methods: {
    async sendEditRequest() {
      UserService.editMarker(this.marker).then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
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
