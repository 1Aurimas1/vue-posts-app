<template>
  <div>
    <Pagination
      @changePage="onPageChange"
      :totalItems="totalAuthors"
      :itemsPerPage="pagination.perPage"
      :totalDisplayedItems="authorList.length"
    />
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
import Pagination from "../Pagination.vue";

export default {
  components: {
    Author,
    Pagination,
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 2,
      },
    };
  },
  computed: mapGetters(["authorList", "totalAuthors"]),
  methods: {
    ...mapActions(["fetchPaginatedAuthors"]),
    onPageChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchPaginatedAuthors(this.pagination);
    },
  },
  created() {
    this.fetchPaginatedAuthors(this.pagination);
  },
};
</script>
