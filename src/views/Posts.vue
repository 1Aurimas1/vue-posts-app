<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <h1 class="title">{{ title }}</h1>
    <PostsList />
  </div>
</template>

<script>
import PostsList from "../components/Posts/PostsList.vue";

export default {
  components: {
    PostsList,
  },
  data() {
    return {
      title: "Posts page",
    };
  },
};
</script>
