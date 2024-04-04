<template>
  <div>
    <Search @search="handleSearch" />
    <Pagination
      @changePage="onPageChange"
      :totalItems="totalPosts"
      :itemsPerPage="pagination.perPage"
      :totalDisplayedItems="postList.length"
    />
    <div class="columns is-flex has-background-grey-light">
      <div class="column is-4 has-text-weight-bold">Title</div>
      <div class="column is-2 has-text-weight-bold">Author</div>
      <div class="column is-4 has-text-weight-bold">Creation/edit date</div>
      <div class="column is-2"></div>
    </div>
    <Post :post="post" v-for="post in postList" :key="post.id" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Post from "./Post.vue";
import Pagination from "../Pagination.vue";
import Search from "../Search.vue";

export default {
  components: {
    Post,
    Pagination,
    Search,
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 3,
      },
      searchQuery: "",
    };
  },
  computed: mapGetters(["postList", "totalPosts"]),
  methods: {
    ...mapActions(["fetchPaginatedPosts"]),
    onPageChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchPaginatedPosts({
        pagination: this.pagination,
        query: this.searchQuery,
      });
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.fetchPaginatedPosts({ pagination: this.pagination, query: query });
    },
  },
  created() {
    this.fetchPaginatedPosts({
      pagination: this.pagination,
      query: this.searchQuery,
    });
  },
};
</script>
