<template>
  <div id="marker-list" class="table-container">
    <table class="table">
      <tr>
        <th>
          Title
        </th>
        <th>
          Date
        </th>
        <th>
          Country
        </th>
        <th>
          Edit
        </th>
      </tr>
      <tr v-for="marker of markers" :key="marker">
        <td>
          {{ marker.title }}
        </td>
        <td>
          {{ marker.date }}
        </td>
        <td>
          Afganistan
        </td>
        <td>
          <a @click="emitEdit(marker)"><edit-icon /> </a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import EditIcon from "vue-material-design-icons/Pencil.vue";

export default {
  name: "marker-list",
  props: {
    markers: null,
  },
  components: {
    EditIcon,
  },
  methods: {
    emitEdit(marker) {
      this.$emit("editmarker", marker);
    },
  },
};
</script>

<style scope>
.table-container {
  position: absolute;
}
@media (max-width: 4000px) {
  .table-container {
    top: 15%;
    left: 25%;
    min-width: 50%;
  }
  table {
    width: 100%;
  }
}
@media (max-width: 1200px) {
  .table-container {
    top: 15%;
    left: 3%;
    min-width: 94%;
  }
}
</style>
