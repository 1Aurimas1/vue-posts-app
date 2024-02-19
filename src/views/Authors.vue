<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <h1 class="title">{{ title }}</h1>
    <button
      @click="showCreateAuthor"
      class="button is-primary is-outlined mb-5"
    >
      Add author
    </button>
    <AuthorsList />
  </div>
</template>

<script>
import AuthorsList from "../components/Authors/AuthorsList.vue";
import { mapActions } from "vuex";

export default {
  components: {
    AuthorsList,
  },
  data() {
    return {
      title: "Authors page",
    };
  },
  methods: {
    ...mapActions(["showModal"]),
    showCreateAuthor() {
      this.showModal({ componentName: "CreateAuthor", title: "New author" });
    },
  },
};
</script>
