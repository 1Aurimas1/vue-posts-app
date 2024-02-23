<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <h1 class="title">{{ title }}</h1>
    <button @click="showCreatePost" class="button is-primary is-outlined mb-5">
      Add post
    </button>
    <PostsList />
  </div>
</template>

<script>
import PostsList from "../components/Posts/PostsList.vue";
import { mapActions } from "vuex";

export default {
  components: {
    PostsList,
  },
  data() {
    return {
      title: "Posts page",
    };
  },
  methods: {
    ...mapActions(["showModal"]),
    showCreatePost() {
      this.showModal({ componentName: "CreatePost", title: "New post" });
    },
  },
};
</script>
