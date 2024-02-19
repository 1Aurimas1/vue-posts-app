<template>
  <div>
    <div class="columns is-flex has-background-grey-light">
      <div class="column is-4 has-text-weight-bold">Name</div>
      <div class="column is-5 has-text-weight-bold">Creation/edit date</div>
      <div class="column is-3"></div>
    </div>
    <Author :author="author" v-for="author in authorList" :key="author.id" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Author from "./Author.vue";

export default {
  components: {
    Author,
  },
  computed: mapGetters(["authorList"]),
  methods: {
    ...mapActions(["fetchAuthors"]),
  },
  created() {
    this.fetchAuthors();
  },
};
</script>
