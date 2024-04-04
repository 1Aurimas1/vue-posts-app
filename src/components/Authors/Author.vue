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
import { getMaxDate } from "../../helpers";

export default {
  props: {
    author: Object,
  },
  methods: {
    ...mapActions(["showModal"]),
    ...mapMutations(["setSelectedAuthorId"]),
    getNewerDate() {
      return getMaxDate(this.author.created_at, this.author.updated_at);
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
  width: 35rem;
}
</style>
