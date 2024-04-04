<template>
  <div>
    <Search @search="handleSearch" />
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
import Search from "../Search.vue";

export default {
  components: {
    Author,
    Pagination,
    Search,
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 2,
      },
      searchQuery: "",
    };
  },
  computed: mapGetters(["authorList", "totalAuthors"]),
  methods: {
    ...mapActions(["fetchPaginatedAuthors"]),
    onPageChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchPaginatedAuthors({
        pagination: this.pagination,
        query: this.searchQuery,
      });
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.fetchPaginatedAuthors({ pagination: this.pagination, query: query });
    },
  },
  created() {
    this.fetchPaginatedAuthors({
      pagination: this.pagination,
      query: this.searchQuery,
    });
  },
};
</script>
