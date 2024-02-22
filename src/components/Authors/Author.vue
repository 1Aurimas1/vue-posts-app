<template>
  <div class="columns is-flex has-background-grey-lighter data-list">
    <div class="column is-4 wrap">
      {{ author.name }}
    </div>
    <div class="column is-5">
      {{ getNewerDate() }}
    </div>
    <div class="column is-3 is-flex">
      <button
        @click="showEditModal"
        class="button is-small is-warning is-light"
      >
        E
      </button>
      <button
        @click="showDeleteModal"
        class="button is-small is-danger is-light ml-2"
      >
        D
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    author: Object,
  },
  methods: {
    ...mapActions(["showModal"]),
    ...mapMutations(["setSelectedAuthorId"]),
    getNewerDate() {
      const createdDate = new Date(this.author.created_at);
      const updatedDate = new Date(this.author.updated_at);
      if (createdDate < updatedDate) return this.author.updated_at;
      return this.author.created_at;
    },
    showEditModal() {
      this.setSelectedAuthorId(this.author.id);

      this.showModal({
        componentName: "EditAuthor",
        title: "Edit author",
      });
    },
    showDeleteModal() {
      this.setSelectedAuthorId(this.author.id);

      this.showModal({
        componentName: "DeleteAuthor",
        title: "Delete confirmation",
      });
    },
  },
};
</script>

<style scoped>
.wrap {
  word-wrap: break-word;
  overflow: hidden;
}
.data-list {
  width: 25rem;
}
</style>
