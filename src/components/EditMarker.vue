<template>
  <div id="edit-marker">
    <div class="container field box is-4 has-text-centered">
      <form>
        <div class="field">
          <div class="control">
            <input type="text" class="input" placeholder="Title" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input type="date" class="input" placeholder="Date" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea class="input" placeholder="Description"></textarea>
          </div>
        </div>
        <button class="button is-info is-large">Submit changes</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-marker",
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
    left: 18%;
    top: 40%;
    margin: 0;
  }
}
</style>
