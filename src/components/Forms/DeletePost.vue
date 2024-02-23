<template>
  <div v-if="post">
    <div class="field">
      <label class="label">Title</label>
      <div>{{ post.title }}</div>
    </div>
    <div class="field">
      <label class="label">Author</label>
      <div>{{ post.author.name }}</div>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div>{{ post.body }}</div>
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
    ...mapGetters({ post: "singlePost" }),
  },
  methods: {
    ...mapActions(["deletePost", "hideModal"]),
    handleDelete() {
      this.performCleanup();

      this.deletePost(this.post.id);
    },
    performCleanup() {
      this.hideModal();
    },
  },
};
</script>
