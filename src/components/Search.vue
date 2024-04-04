<template>
  <div class="field">
    <input
      type="text"
      v-model="searchQuery"
      @input="debounceInput"
      placeholder="Search..."
      class="input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      timeoutId: null,
    };
  },
  methods: {
    emitSearch() {
      this.$emit("search", this.searchQuery);
    },
    debounceInput() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.emitSearch();
      }, 200);
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
};
</script>
