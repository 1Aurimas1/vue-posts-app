<template>
  <div>
    <div class="field">
      <label class="label">Name</label>
      <div>{{ selectedAuthor.name }}</div>
    </div>

    <div class="control">
      <button @click="handleDelete" class="button is-danger is-outlined">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["selectedAuthor"]),
  },
  methods: {
    ...mapActions(["deleteAuthor", "hideModal"]),
    handleDelete() {
      this.performCleanup();

      this.deleteAuthor(this.selectedAuthor.id);
    },
    performCleanup() {
      this.hideModal();
    },
  },
};
</script>
