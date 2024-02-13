<template>
  <h1 class="title">{{ title }}</h1>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Posts page",
    };
  },
  methods: {
    ...mapActions(["addNewNotification"]),
  },
  created() {
    // fetch posts ...

    // if there are no posts...
    this.addNewNotification({ message: "There are no articles yet" });
  },
};
</script>
