<template>
  <div>
    <div class="columns is-flex has-background-grey-light">
      <div class="column is-4 has-text-weight-bold">Title</div>
      <div class="column is-3 has-text-weight-bold">Author</div>
      <div class="column is-5 has-text-weight-bold">Creation/edit date</div>
    </div>
    <Post :post="post" v-for="post in postList" :key="post.id" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Post from "./Post.vue";

export default {
  components: {
    Post,
  },
  computed: mapGetters(["postList"]),
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  created() {
    this.fetchPosts();
  },
};
</script>
