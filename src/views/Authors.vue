<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <h1 class="title">{{ title }}</h1>
    <AuthorsList />
  </div>
</template>

<script>
import AuthorsList from "../components/Authors/AuthorsList.vue";

export default {
  components: {
    AuthorsList,
  },
  data() {
    return {
      title: "Authors page",
    };
  },
};
</script>
