<template>
  <h1 class="title">{{ title }}</h1>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Authors page",
    };
  },
  methods: {
    ...mapActions(["addNewNotification"]),
  },
  created() {
    // fetch authors ...

    // if there are no authors...
    this.addNewNotification({ message: "There are no authors yet" });
  },
};
</script>
