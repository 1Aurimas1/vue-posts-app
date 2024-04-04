<template>
  <div>
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

export default {
  components: {
    Post,
    Pagination,
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 3,
      },
    };
  },
  computed: mapGetters(["postList", "totalPosts"]),
  methods: {
    ...mapActions(["fetchPaginatedPosts"]),
    onPageChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchPaginatedPosts(this.pagination);
    },
  },
  created() {
    this.fetchPaginatedPosts(this.pagination);
  },
};
</script>
