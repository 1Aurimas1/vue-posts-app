<template>
  <nav class="pagination is-centered" role="navigation">
    <a
      @click="changePage(currentPage - 1)"
      :disabled="isFirstPage"
      class="pagination-previous"
      >Previous</a
    >
    <ul class="pagination-list">
      <li>
        <a
          @click="changePage(1)"
          :disabled="isFirstPage"
          class="pagination-link"
          >1</a
        >
      </li>
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link is-current">{{ currentPage }}</a>
      </li>
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a
          @click="changePage(totalPages)"
          :disabled="isLastPage"
          class="pagination-link"
          >{{ totalPages || 1 }}</a
        >
      </li>
    </ul>
    <a
      @click="changePage(currentPage + 1)"
      :disabled="isLastPage"
      class="pagination-next"
      >Next page</a
    >
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true },
    totalDisplayedItems: { type: Number, required: true },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.totalPages || 0 === this.totalPages;
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("changePage", page);
        this.currentPage = page;
      }
    },
  },
  watch: {
    totalDisplayedItems(newVal) {
      if (newVal === 0) {
        if (this.currentPage === 1 && this.totalItems > 0) {
          this.changePage(this.currentPage);
        } else {
          this.changePage(this.currentPage - 1);
        }
      }
    },
  },
};
</script>
